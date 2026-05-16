# AidChain

Transparent humanitarian aid distribution using milestone-based escrow, AI verification, and biometric proof. Built on Stellar with Trustless Work.

---

## Live Demo

- **Application**: Deploy locally with `npm run dev` or host the `dist/` folder
- **Live Escrow on Stellar Testnet**: [View in Escrow Viewer](https://viewer.trustlesswork.com/CAPYVLX7GXIM3UQI3BYCKUOTFIFFNRRBALQFX3LX7LZ4Q4L3YL5UWG2W)
- **Contract ID**: `CAPYVLX7GXIM3UQI3BYCKUOTFIFFNRRBALQFX3LX7LZ4Q4L3YL5UWG2W`
- **Network**: Stellar Testnet (Soroban)

---

## On-Chain Proof

The escrow contract was deployed live on Stellar testnet using the Trustless Work API.

| Field | Value |
|---|---|
| Contract ID | `CAPYVLX7GXIM3UQI3BYCKUOTFIFFNRRBALQFX3LX7LZ4Q4L3YL5UWG2W` |
| Escrow Viewer | https://viewer.trustlesswork.com/CAPYVLX7GXIM3UQI3BYCKUOTFIFFNRRBALQFX3LX7LZ4Q4L3YL5UWG2W |
| Network | Stellar Testnet |
| Type | Multi-Release Escrow |
| Title | Somalia Food Aid 2026 |
| Engagement ID | aidchain-demo-001 |
| Total Amount | 10,000 USDC |
| Milestones | 3 |
| Trustline | USDC (`GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5`) |

### Roles

| Role | Address |
|---|---|
| Donor / Platform | `GDJ45RQU3O3XMR23PSLDZLEADUZPHUMRWYP4BFQCSKUOON2EYIA4BMDB` |
| NGO / Service Provider | `GAXFQM2KEGFWWULBR4LVIKQMLBTQRDLYZO4I45UNRND6OJAJOHLUC6QK` |
| Field Monitor / Approver | `GBVYQO33KTJNC7TQM3OQUWUSQCEAS3KVD6LQ6JETV7AFG66LWSIW4RA3` |
| Dispute Resolver | `GBVYQO33KTJNC7TQM3OQUWUSQCEAS3KVD6LQ6JETV7AFG66LWSIW4RA3` |

### Milestones

| # | Description | Amount | Status |
|---|---|---|---|
| 1 | Beneficiary Registration | 2,000 USDC (20%) | Pending |
| 2 | Aid Distribution | 4,000 USDC (40%) | Pending |
| 3 | Final Audit | 4,000 USDC (40%) | Pending |

---

## The Problem

Humanitarian aid loses billions annually to corruption, duplicate payments, and zero accountability. The UN WFP Building Blocks program saved $288M by preventing duplicate assistance -- but milestone-based conditional fund releases with cryptographic verification do not exist yet.

---

## The Solution

AidChain adds a programmable escrow layer on top of proven humanitarian infrastructure:

1. Donor locks funds in a multi-release escrow on Stellar
2. Field worker submits evidence (photo hash + GPS coordinates)
3. AI agent verifies evidence autonomously (94% confidence scoring)
4. Field monitor approves after AI verification
5. Biometric scanner proves unique beneficiary distribution
6. Funds release only when all conditions are met
7. Hypercert mints after completion for retroactive funding

---

## Trust Design

### Parties

- **Donor**: Locks funds in escrow (individual, DAO, or foundation)
- **NGO**: Receives milestone payments (service provider)
- **Field Monitor**: Validates evidence and approves releases (approver)
- **Beneficiaries**: Receive aid, verified via biometric hashes
- **AI Agent**: Autonomous pre-approval verifier
- **Dispute Resolver**: Arbitration DAO or certified auditor

### Fund Flow

```
Donor --> Escrow Contract (10,000 USDC)
              |
    Milestone 1: 2,000 USDC --> NGO (20%)
              |
    Milestone 2: 4,000 USDC --> NGO (40%)
              |
    Milestone 3: 4,000 USDC --> NGO (40%)
```

### Unlock Conditions

**Milestone 1 - Beneficiary Registration (2,000 USDC)**
- Beneficiary registration data uploaded
- AI agent verified (photo hash + GPS + timestamp)
- Field monitor approved

**Milestone 2 - Aid Distribution (4,000 USDC)**
- Distribution evidence uploaded
- AI agent verified
- 1,000 unique biometric hashes recorded
- Field monitor approved

**Milestone 3 - Final Audit (4,000 USDC)**
- Audit report uploaded
- AI agent verified
- Field monitor approved

### Dispute Resolution

- Primary: Field monitor (trusted third party)
- Escalation: Arbitration DAO or certified humanitarian auditor
- Evidence: All photo hashes, GPS coordinates, and biometric hashes stored on-chain

---

## Features

### Non-Custodial Escrow
Funds locked in Trustless Work smart contracts on Stellar. Released only when milestones complete. No intermediary holds funds at any point.

### AI Verification
Autonomous agents verify field evidence before human approval. Checks photo hash uniqueness, GPS coordinates against humanitarian zones, and timestamp validity. 94% confidence scoring.

### Biometric Proof
Privacy-preserving SHA-256 hashes prove unique beneficiary distribution. Raw biometric data never leaves the device. Cryptographically impossible to reverse-engineer.

### Impact Certificates
Hypercerts minted after all milestones complete. Contains beneficiaries served, cost per person, evidence hashes, and impact score. Creates a secondary market for proven impact.

---

## Dashboard

Three role-based views:

**Donor**
- Deploy escrow with project name
- View live contract address with Escrow Viewer link
- Track milestone progress and fund releases

**Field Worker**
- Submit evidence (photo hash + GPS) per milestone
- Watch AI agent verify in real time
- Scan beneficiary biometrics with progress bar

**Field Monitor**
- Review AI-verified milestones
- Approve and release funds to NGO
- View full activity log

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Routing | React Router |
| Blockchain | Stellar (Soroban) |
| Escrow | Trustless Work Multi-Release API |
| AI Verification | Autonomous agent (simulated) |
| Biometric | SHA-256 hashing (privacy-preserving) |
| Impact Certificates | Hypercerts protocol |
| Icons | Lucide React |

---

## Architecture

```
Donor Dashboard
(Deploy escrow, view milestones, track progress)
        |
        v
Trustless Work Multi-Release Escrow
(Stellar Soroban Contract)
        |
   _____|_____
  |     |     |
  v     v     v
Field  AI    Field
Worker Agent Monitor
  |     |     |
  v     v     v
Evidence  Verify  Approve +
Upload    (auto)  Release
        |
        v
Biometric Verification
(Privacy-Preserving Hash)
        |
        v
Funds Released to NGO
        |
        v
Hypercert Minted
```

---

## Quick Start

```bash
git clone https://github.com/Tasfia-17/aidchain.git
cd aidchain
npm install
cp .env.example .env
# Add your Trustless Work API key to .env
npm run dev
```

Open http://localhost:5173

---

## Environment Variables

```
VITE_TW_API_KEY=        # Trustless Work API key
VITE_DEMO_CONTRACT_ID=  # Pre-deployed escrow contract ID (optional)
```

Get an API key: https://docs.trustlesswork.com/trustless-work/introduction/developer-resources/request-api-key

---

## Build

```bash
npm run build
# Output in dist/ - deploy to Vercel, Netlify, or any static host
```

---

## Project Structure

```
aidchain/
├── src/
│   ├── components/
│   │   └── Navigation.jsx       # Sticky nav with routing
│   ├── lib/
│   │   ├── aidchain-core.js     # AI verifier, biometric hasher, Hypercerts
│   │   └── trustless-api.js     # Trustless Work REST API integration
│   ├── pages/
│   │   ├── Landing.jsx          # Hero, features, stats, CTA
│   │   ├── Platform.jsx         # Technical overview
│   │   ├── HowItWorks.jsx       # 6-step process
│   │   └── Dashboard.jsx        # Interactive demo (3 roles)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                # Monad design system
├── .env.example
├── index.html
└── package.json
```

---

## Hackathon

**Boundless x Trustless Work Hackathon**
- Category: Core Trustless Work Applications
- Track: Grants, bounties, and DAO funding tools / Humanitarian aid

---

## Links

- Trustless Work Docs: https://docs.trustlesswork.com
- Trustless Work API: https://dev.api.trustlesswork.com
- Escrow Viewer: https://viewer.trustlesswork.com
- BackOffice dApp: https://dapp.trustlesswork.com
- Stellar Testnet Explorer: https://stellar.expert/explorer/testnet
- WFP Building Blocks: https://innovation.wfp.org/project/building-blocks
- Hypercerts Protocol: https://hypercerts.org

---

## License

MIT
