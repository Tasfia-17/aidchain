// Trustless Work API Integration
// Base URL: https://dev.api.trustlesswork.com (testnet)
// Docs: https://docs.trustlesswork.com/trustless-work/api-rest/deploy-1/initialize-escrow

const BASE_URL = 'https://dev.api.trustlesswork.com';
const API_KEY = import.meta.env.VITE_TW_API_KEY || '';

// USDC trustline on Stellar testnet
const USDC_TESTNET = {
  symbol: 'USDC',
  address: 'GBBD47IF6LWK7P7MDEVSCUWDWDCGXMASA6SBNGHTFFOMKQKBRRDLWEI'
};

const http = async (path, body) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.json();
};

/**
 * Step 1: Deploy multi-release escrow
 * Returns { unsignedTransaction } — must be signed by wallet then sent via /helper/send-transaction
 */
export async function deployEscrow({ signer, projectName, ngoAddress, approverAddress }) {
  return http('/deployer/multi-release', {
    signer,
    engagementId: `aidchain-${Date.now()}`,
    title: projectName,
    description: `AidChain humanitarian aid escrow for ${projectName}`,
    roles: {
      approver: approverAddress,
      serviceProvider: ngoAddress,
      platformAddress: signer,
      releaseSigner: approverAddress,
      disputeResolver: approverAddress
    },
    platformFee: 1,
    milestones: [
      { description: 'Beneficiary Registration', amount: '2000', receiver: ngoAddress },
      { description: 'Aid Distribution', amount: '4000', receiver: ngoAddress },
      { description: 'Final Audit', amount: '4000', receiver: ngoAddress }
    ],
    trustline: USDC_TESTNET
  });
}

/**
 * Step 2: Send signed XDR transaction to Stellar network
 * Returns { contractId } — the on-chain escrow address
 */
export async function sendTransaction(signedXdr) {
  return http('/helper/send-transaction', { signedXdr });
}

/**
 * Step 3: Approve a milestone (by approver)
 */
export async function approveMilestone({ contractId, milestoneIndex, signer }) {
  return http('/escrow/multi-release/change-milestone-flag', {
    contractId,
    milestoneIndex,
    signer,
    flag: 'approved',
    value: true
  });
}

/**
 * Step 4: Release milestone funds
 */
export async function releaseMilestoneFunds({ contractId, milestoneIndex, signer }) {
  return http('/escrow/multi-release/release-funds', {
    contractId,
    milestoneIndex,
    signer
  });
}

export const VIEWER_URL = (contractId) =>
  `https://viewer.trustlesswork.com/${contractId}`;
