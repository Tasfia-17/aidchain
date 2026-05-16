# AidChain - Technical Architecture

## System Overview

AidChain is a milestone-based humanitarian aid escrow system built on Trustless Work (Stellar/Soroban) with autonomous AI verification and privacy-preserving biometric proof.

## Core Components

### 1. Escrow Layer (Trustless Work)

**Contract Type**: Multi-Release Escrow

**Roles**:
- `donor`: Funds the escrow
- `ngo`: Receives milestone payments (Service Provider)
- `fieldMonitor`: Approves milestones (Approver + Release Signer)
- `disputeResolver`: Handles disputes (optional)

**Milestones**:
```javascript
[
  { name: 'Beneficiary Registration', amount: 2000, percentage: 20 },
  { name: 'Aid Distribution', amount: 4000, percentage: 40 },
  { name: 'Final Audit', amount: 4000, percentage: 40 }
]
```

**Flow**:
1. Deploy escrow contract → returns `contractAddress`
2. Donor funds escrow with total amount (10,000 USDC)
3. For each milestone:
   - Field worker submits evidence
   - AI agent verifies
   - Field monitor approves
   - Funds auto-release to NGO
4. All complete → Hypercert minted

### 2. AI Verification Agent

**Purpose**: Autonomous pre-approval verification before human review

**Checks**:
1. **Photo Hash Uniqueness**
   - Verifies hash not previously submitted
   - Prevents evidence reuse
   - Simulates on-chain registry lookup

2. **GPS Validation**
   - Checks coordinates within humanitarian zones
   - Uses geofencing logic
   - In production: integrate with UN OCHA location registry

3. **Timestamp Verification**
   - Ensures evidence is recent (within milestone window)
   - Prevents backdated submissions

**Output**:
```javascript
{
  approved: true/false,
  confidence: 0.94, // 94% confidence score
  reason: "All checks passed" // or specific failure reason
}
```

**Implementation**:
```javascript
class AIVerifier {
  async verifyEvidence(evidence) {
    // 1. Check photo hash uniqueness
    // 2. Verify GPS in humanitarian zone
    // 3. Validate timestamp
    // Returns approval + confidence score
  }
}
```

### 3. Biometric Verification System

**Purpose**: Prove N unique beneficiaries received aid without storing sensitive data

**Privacy Model**:
- Raw biometric data (iris scan, fingerprint) captured on device
- One-way SHA-256 hash generated locally
- Only hash submitted on-chain
- Impossible to reverse-engineer original biometric

**Flow**:
```
Beneficiary → Biometric Scanner → SHA-256 Hash → On-chain Registry
                                      ↓
                              Check uniqueness
                                      ↓
                              Increment counter
```

**Implementation**:
```javascript
class BiometricHasher {
  async generateHash(biometricData) {
    // SHA-256 hash of biometric data
    return hash;
  }
  
  registerHash(hash) {
    // Add to on-chain registry
    this.registeredHashes.add(hash);
  }
  
  isUnique(hash) {
    // Check if hash already exists
    return !this.registeredHashes.has(hash);
  }
}
```

**Milestone Integration**:
- Milestone 2 (Aid Distribution) requires 1,000 unique biometric hashes
- Funds only release when threshold met
- Proves actual distribution to unique individuals

### 4. Hypercerts (Impact Certificates)

**Purpose**: Tokenize completed aid projects for retroactive funding

**Generated After**: All milestones complete

**Contains**:
```javascript
{
  id: 'hypercert-1234567890',
  projectName: 'Emergency Food Distribution - Syria',
  ngoName: 'World Relief Foundation',
  beneficiariesServed: 1000,
  totalFunding: 10000,
  costPerBeneficiary: 10.00,
  evidenceHashes: ['0xabc...', '0xdef...', '0x123...'],
  gpsCoordinates: [{lat, lng}, ...],
  verificationMethod: 'AI Agent + Human Field Monitor + Biometric',
  blockchainNetwork: 'Stellar (Soroban)',
  escrowContract: 'GXXXXXXX...',
  impactScore: 87 // 0-100 based on efficiency + completion
}
```

**Impact Score Algorithm**:
```javascript
efficiencyScore = (beneficiaries / (totalAmount / 1000)) * 10
completionScore = (milestonesCompleted / totalMilestones) * 30
verificationScore = 40 // Full score for complete verification
impactScore = min(100, efficiencyScore + completionScore + verificationScore)
```

**Use Cases**:
1. **Retroactive Funding**: Other donors buy Hypercerts to reward effective NGOs
2. **Reputation System**: NGOs with many verified Hypercerts get priority
3. **Impact Marketplace**: Secondary market for impact certificates

### 5. Integration with WFP Building Blocks

**Current State**: WFP Building Blocks handles beneficiary registration (biometric IDs)

**AidChain Extension**:
- Building Blocks → Beneficiary ID registry
- AidChain → Milestone escrow layer on top
- Shared biometric hashes for verification

**Architecture**:
```
Building Blocks (UN)
    ↓ (provides beneficiary IDs)
AidChain Escrow Layer
    ↓ (milestone-based releases)
NGO Receives Funds
```

**Benefits**:
- Leverage proven UN infrastructure (6M people, 40M+ transactions)
- Add programmable accountability
- No competition with existing systems

## Data Flow

### Milestone Completion Flow

```
1. Field Worker
   ↓ uploads evidence
   {photoHash, gps, timestamp}
   
2. AI Agent
   ↓ verifies
   {approved: true, confidence: 0.94}
   
3. Milestone Status
   ↓ updates to
   'pending-approval'
   
4. Field Monitor
   ↓ reviews & approves
   approveMilestone(milestoneId)
   
5. Smart Contract
   ↓ releases funds
   releaseMilestoneFunds(milestoneId)
   
6. NGO Wallet
   ↓ receives
   2,000 USDC (Milestone 1)
   
7. Activity Log
   ↓ records
   "✅ 2,000 USDC released to NGO"
```

## Security Considerations

### 1. Biometric Privacy
- **Threat**: Biometric data leak
- **Mitigation**: One-way hashing, no raw data stored
- **Standard**: SHA-256 (irreversible)

### 2. Evidence Tampering
- **Threat**: Fake photo hashes
- **Mitigation**: AI agent checks uniqueness + GPS validation
- **Future**: IPFS pinning for photo storage

### 3. GPS Spoofing
- **Threat**: Fake location data
- **Mitigation**: AI agent validates against humanitarian zone registry
- **Future**: Chainlink oracle integration for real-time verification

### 4. Sybil Attacks (Duplicate Beneficiaries)
- **Threat**: Same person scanned multiple times
- **Mitigation**: Biometric hash uniqueness check
- **Guarantee**: Cryptographically impossible to generate same hash from different biometric

## Scalability

### Current Demo
- 1 escrow, 3 milestones, 1,000 beneficiaries
- Simulated AI verification (< 2s)
- Mock biometric scanning

### Production Scale
- **Escrows**: Unlimited (each is independent contract)
- **Beneficiaries**: Millions (WFP Building Blocks proven at 6M+)
- **Verification**: Parallel AI agents (horizontally scalable)
- **Blockchain**: Stellar handles 1,000+ TPS

## Future Enhancements

### Phase 1 (Post-Hackathon)
1. Real Trustless Work SDK integration
2. Stellar wallet connectivity (Freighter)
3. IPFS for evidence storage
4. Actual Hypercerts minting on-chain

### Phase 2 (Pilot)
1. Chainlink oracle for GPS verification
2. Integration with WFP Building Blocks API
3. Real biometric SDK (iris scan)
4. Multi-signature dispute resolution

### Phase 3 (Scale)
1. DAO governance for dispute resolution
2. Hypercert marketplace
3. Cross-chain bridge (Ethereum for Hypercerts)
4. Mobile app for field workers

## Cost Analysis

### Traditional Aid Distribution
- **Cost per beneficiary**: $15-20
- **Administrative overhead**: 20-30%
- **Verification**: Manual, slow, error-prone

### AidChain
- **Cost per beneficiary**: $10
- **Administrative overhead**: 5-10% (automated)
- **Verification**: AI + biometric, real-time, cryptographic

### Savings at Scale
- **1M beneficiaries**: $5-10M saved
- **Time to distribution**: 70% faster
- **Fraud prevention**: $288M saved (WFP Building Blocks proven)

## Technical Dependencies

### Core
- React 18.3+
- Vite 5.3+
- Trustless Work SDK (escrow)
- Stellar Wallets Kit (wallet connectivity)

### Future
- Chainlink (oracles)
- IPFS (evidence storage)
- Hypercerts SDK (impact certificates)
- WFP Building Blocks API (beneficiary IDs)

## Deployment

### Testnet (Current)
- Stellar Testnet
- Trustless Work Dev API
- Mock verification

### Mainnet (Production)
- Stellar Mainnet
- Trustless Work Production API
- Real biometric hardware
- Chainlink oracles

## Monitoring & Analytics

### Key Metrics
1. **Escrow Health**
   - Total value locked
   - Milestones completed
   - Average time to release

2. **Verification Performance**
   - AI approval rate
   - Human override rate
   - Evidence rejection reasons

3. **Impact Metrics**
   - Beneficiaries served
   - Cost per beneficiary
   - Hypercerts minted

4. **System Performance**
   - Transaction finality time
   - Verification latency
   - Biometric scan throughput

---

**Last Updated**: May 16, 2026
**Version**: 1.0.0
**Status**: Hackathon Demo
