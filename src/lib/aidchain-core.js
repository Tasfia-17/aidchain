// AI Agent Verifier - Simulates autonomous verification
export class AIVerifier {
  constructor() {
    this.logs = [];
  }

  async verifyEvidence(evidence) {
    this.log('🤖 AI Agent: Starting verification...');
    
    await this.delay(800);
    
    // Verify photo hash
    const photoValid = await this.verifyPhotoHash(evidence.photoHash);
    if (!photoValid) {
      this.log('❌ AI Agent: Photo hash validation failed');
      return { approved: false, reason: 'Invalid photo hash' };
    }
    
    // Verify GPS coordinates
    const gpsValid = await this.verifyGPS(evidence.gps);
    if (!gpsValid) {
      this.log('❌ AI Agent: GPS validation failed - location not in humanitarian zone');
      return { approved: false, reason: 'GPS outside humanitarian zone' };
    }
    
    // Verify timestamp
    const timeValid = await this.verifyTimestamp(evidence.timestamp);
    if (!timeValid) {
      this.log('❌ AI Agent: Timestamp validation failed');
      return { approved: false, reason: 'Timestamp outside milestone window' };
    }
    
    this.log('✅ AI Agent: All checks passed - evidence verified');
    return { approved: true, confidence: 0.94 };
  }

  async verifyPhotoHash(hash) {
    this.log(`🔍 AI Agent: Checking photo hash ${hash.substring(0, 12)}...`);
    await this.delay(500);
    
    // Simulate hash uniqueness check
    const isUnique = !this.isDuplicateHash(hash);
    if (isUnique) {
      this.log('✓ Photo hash is unique');
    }
    return isUnique;
  }

  async verifyGPS(gps) {
    this.log(`📍 AI Agent: Verifying GPS coordinates ${gps.lat}, ${gps.lng}...`);
    await this.delay(600);
    
    // Simulate humanitarian zone check
    // For demo: accept coordinates in specific ranges
    const inHumanitarianZone = Math.abs(gps.lat) < 60 && Math.abs(gps.lng) < 180;
    if (inHumanitarianZone) {
      this.log('✓ GPS coordinates within humanitarian zone');
    }
    return inHumanitarianZone;
  }

  async verifyTimestamp(timestamp) {
    this.log(`⏰ AI Agent: Checking timestamp ${new Date(timestamp).toLocaleString()}...`);
    await this.delay(400);
    
    // Verify timestamp is recent (within last 30 days)
    const now = Date.now();
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
    const isRecent = timestamp > thirtyDaysAgo && timestamp <= now;
    
    if (isRecent) {
      this.log('✓ Timestamp within valid window');
    }
    return isRecent;
  }

  isDuplicateHash(hash) {
    // In production, check against on-chain registry
    // For demo, randomly reject 5% as duplicates
    return Math.random() < 0.05;
  }

  log(message) {
    const entry = {
      timestamp: Date.now(),
      message,
      type: 'ai'
    };
    this.logs.push(entry);
  }

  getLogs() {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Biometric Hash Generator - Privacy-preserving biometric verification
export class BiometricHasher {
  constructor() {
    this.registeredHashes = new Set();
  }

  async generateHash(biometricData) {
    // Simulate biometric scan processing
    await this.delay(1000);
    
    // In production: use actual biometric SDK
    // For demo: generate deterministic hash from simulated data
    const hash = await this.sha256(JSON.stringify(biometricData));
    return hash;
  }

  async sha256(message) {
    // Simple hash simulation for demo
    // In production: use Web Crypto API or crypto-js
    const msgBuffer = new TextEncoder().encode(message);
    let hash = 0;
    for (let i = 0; i < msgBuffer.length; i++) {
      hash = ((hash << 5) - hash) + msgBuffer[i];
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(64, '0');
  }

  registerHash(hash) {
    this.registeredHashes.add(hash);
  }

  isUnique(hash) {
    return !this.registeredHashes.has(hash);
  }

  getUniqueCount() {
    return this.registeredHashes.size;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Hypercert Generator - Impact certificate creation
export class HypercertGenerator {
  async generateCertificate(escrowData, milestones) {
    const completedMilestones = milestones.filter(m => m.status === 'released');
    const totalBeneficiaries = escrowData.targetBeneficiaries;
    const totalFunding = completedMilestones.reduce((sum, m) => sum + m.amount, 0);
    const costPerBeneficiary = totalFunding / totalBeneficiaries;

    return {
      id: `hypercert-${Date.now()}`,
      projectName: escrowData.projectName,
      ngoName: escrowData.ngoName,
      beneficiariesServed: totalBeneficiaries,
      totalFunding: totalFunding,
      costPerBeneficiary: costPerBeneficiary.toFixed(2),
      completionDate: new Date().toISOString(),
      evidenceHashes: completedMilestones.map(m => m.evidenceHash),
      gpsCoordinates: completedMilestones.map(m => m.gps),
      verificationMethod: 'AI Agent + Human Field Monitor + Biometric Verification',
      blockchainNetwork: 'Stellar (Soroban)',
      escrowContract: escrowData.contractAddress,
      impactScore: this.calculateImpactScore(escrowData, completedMilestones),
      metadata: {
        createdAt: Date.now(),
        version: '1.0',
        standard: 'Hypercerts v2'
      }
    };
  }

  calculateImpactScore(escrowData, milestones) {
    // Simple impact scoring algorithm
    const efficiencyScore = (escrowData.targetBeneficiaries / (escrowData.totalAmount / 1000)) * 10;
    const completionScore = (milestones.length / 3) * 30;
    const verificationScore = 40; // Full score for complete verification
    
    return Math.min(100, Math.round(efficiencyScore + completionScore + verificationScore));
  }
}

// Mock Trustless Work API for demo
export class MockTrustlessWorkAPI {
  constructor() {
    this.escrows = new Map();
  }

  async deployMultiReleaseEscrow(config) {
    await this.delay(1500);
    
    const escrowId = `escrow-${Date.now()}`;
    const contractAddress = `G${this.randomString(55)}`;
    
    const escrow = {
      id: escrowId,
      contractAddress,
      ...config,
      status: 'deployed',
      funded: false,
      createdAt: Date.now()
    };
    
    this.escrows.set(escrowId, escrow);
    
    return {
      success: true,
      escrowId,
      contractAddress,
      viewerUrl: `https://viewer.trustlesswork.com/${contractAddress}`
    };
  }

  async fundEscrow(escrowId) {
    await this.delay(2000);
    
    const escrow = this.escrows.get(escrowId);
    if (!escrow) throw new Error('Escrow not found');
    
    escrow.funded = true;
    escrow.fundedAt = Date.now();
    
    return { success: true, txHash: `0x${this.randomString(64)}` };
  }

  async approveMilestone(escrowId, milestoneIndex) {
    await this.delay(1000);
    
    const escrow = this.escrows.get(escrowId);
    if (!escrow) throw new Error('Escrow not found');
    
    escrow.milestones[milestoneIndex].approved = true;
    escrow.milestones[milestoneIndex].approvedAt = Date.now();
    
    return { success: true };
  }

  async releaseMilestoneFunds(escrowId, milestoneIndex) {
    await this.delay(1500);
    
    const escrow = this.escrows.get(escrowId);
    if (!escrow) throw new Error('Escrow not found');
    
    escrow.milestones[milestoneIndex].released = true;
    escrow.milestones[milestoneIndex].releasedAt = Date.now();
    
    return { 
      success: true, 
      txHash: `0x${this.randomString(64)}`,
      amount: escrow.milestones[milestoneIndex].amount
    };
  }

  getEscrow(escrowId) {
    return this.escrows.get(escrowId);
  }

  randomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
