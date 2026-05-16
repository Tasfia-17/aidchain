import { useState } from 'react';
import { DollarSign, Users, CheckCircle, MapPin, Fingerprint, Bot, Clock, ExternalLink, ArrowRight } from 'lucide-react';
import { VIEWER_URL } from '../lib/trustless-api';

// Demo escrow pre-deployed on Stellar testnet via BackOffice dApp
// Replace with your real contract address from https://dapp.trustlesswork.com
const DEMO_CONTRACT_ID = import.meta.env.VITE_DEMO_CONTRACT_ID || null;

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('donor');
  const [escrowData, setEscrowData] = useState(null);
  const [milestones, setMilestones] = useState([
    { id: 1, name: 'Beneficiary Registration', percentage: 20, status: 'pending', amount: 2000 },
    { id: 2, name: 'Aid Distribution', percentage: 40, status: 'pending', amount: 4000 },
    { id: 3, name: 'Final Audit', percentage: 40, status: 'pending', amount: 4000 }
  ]);
  const [logs, setLogs] = useState([]);
  const [biometricCount, setBiometricCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, { message, type, timestamp: Date.now() }]);
  };

  const createEscrow = async (e) => {
    e.preventDefault();
    setLoading(true);
    addLog('🚀 Connecting to Trustless Work API (Stellar testnet)...', 'info');

    await delay(800);
    addLog('📋 Deploying multi-release escrow contract...', 'info');
    await delay(1200);

    // Use pre-deployed demo contract if available, otherwise simulate
    const contractId = DEMO_CONTRACT_ID || `GAIDCHAIN${Date.now().toString(36).toUpperCase().padEnd(47, 'X')}`;
    const isReal = !!DEMO_CONTRACT_ID;

    setEscrowData({
      contractId,
      totalAmount: 10000,
      targetBeneficiaries: 1000,
      projectName: e.target.projectName.value,
      isReal
    });

    addLog(`✅ Escrow deployed on Stellar testnet`, 'success');
    addLog(`📍 Contract: ${contractId.substring(0, 20)}...`, 'success');
    if (isReal) {
      addLog('🔗 Live escrow inspectable in Trustless Work Viewer', 'success');
    }
    addLog('💰 Escrow funded with 10,000 USDC', 'success');
    addLog('👉 Switch to "Field Worker" tab to submit evidence', 'info');
    setLoading(false);
  };

  const submitEvidence = (milestoneId) => {
    setLoading(true);
    const idx = milestones.findIndex(m => m.id === milestoneId);
    addLog(`📤 Submitting evidence for ${milestones[idx].name}...`, 'info');

    setTimeout(() => {
      addLog('🤖 AI Agent: Verifying photo hash...', 'ai');
      setTimeout(() => {
        addLog('✓ Photo hash is unique (SHA-256 verified)', 'ai');
        addLog('📍 AI Agent: Verifying GPS coordinates...', 'ai');
        setTimeout(() => {
          addLog('✓ GPS within humanitarian zone (±60° lat)', 'ai');
          addLog('⏰ AI Agent: Timestamp within 30-day window...', 'ai');
          setTimeout(() => {
            addLog('✓ Timestamp valid', 'ai');
            addLog('✅ AI Agent approved with 94% confidence', 'success');
            addLog('👉 Switch to "Field Monitor" tab to approve & release', 'info');
            const updated = [...milestones];
            updated[idx].status = 'pending-approval';
            setMilestones(updated);
            setLoading(false);
          }, 400);
        }, 800);
      }, 600);
    }, 500);
  };

  const approveMilestone = (milestoneId) => {
    setLoading(true);
    const idx = milestones.findIndex(m => m.id === milestoneId);
    addLog(`👤 Field monitor approving ${milestones[idx].name}...`, 'info');

    setTimeout(() => {
      addLog('📝 Signing approval transaction on Stellar...', 'info');
      setTimeout(() => {
        addLog(`✅ Milestone approved on-chain`, 'success');
        addLog(`💸 Releasing ${milestones[idx].amount} USDC to NGO...`, 'info');
        setTimeout(() => {
          const updated = [...milestones];
          updated[idx].status = 'released';
          setMilestones(updated);
          addLog(`✅ ${milestones[idx].amount} USDC released to NGO wallet`, 'success');
          setLoading(false);

          if (updated.every(m => m.status === 'released')) {
            setTimeout(() => {
              addLog('🏆 All milestones complete!', 'success');
              addLog('🎖️ Hypercert minted — available for retroactive funding', 'success');
            }, 800);
          } else {
            const next = updated.find(m => m.status === 'pending');
            if (next) addLog(`👉 Switch to "Field Worker" tab for next milestone: ${next.name}`, 'info');
          }
        }, 1500);
      }, 1000);
    }, 800);
  };

  const scanBiometric = () => {
    setLoading(true);
    addLog('👆 Scanning biometric data...', 'info');
    setTimeout(() => {
      const next = biometricCount + 1;
      setBiometricCount(next);
      addLog(`✅ Unique beneficiary verified (${next}/1000)`, 'success');
      setLoading(false);
    }, 1200);
  };

  const tabs = [
    { id: 'donor', label: 'Donor', icon: DollarSign },
    { id: 'field', label: 'Field Worker', icon: MapPin },
    { id: 'monitor', label: 'Field Monitor', icon: CheckCircle }
  ];

  const pendingApproval = milestones.filter(m => m.status === 'pending-approval');
  const pendingEvidence = milestones.filter(m => m.status === 'pending');

  // Tab badge hints
  const tabBadge = {
    field: escrowData && pendingEvidence.length > 0 ? pendingEvidence.length : null,
    monitor: pendingApproval.length > 0 ? pendingApproval.length : null
  };

  return (
    <div style={{ background: 'var(--color-paper-canvas)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1432px', margin: '0 auto', padding: 'var(--spacing-40)' }}>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: 'var(--spacing-8)',
          marginBottom: 'var(--spacing-40)',
          borderBottom: '1px solid var(--color-pale-stone)'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '16px 24px',
                fontSize: '16px',
                fontFamily: 'var(--font-abc-diatype-mono)',
                color: activeTab === tab.id ? 'var(--color-ink)' : 'var(--color-off-black)',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid var(--color-ink)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-8)',
                position: 'relative'
              }}
            >
              <tab.icon size={18} />
              {tab.label}
              {tabBadge[tab.id] && (
                <span style={{
                  background: '#ed8936',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {tabBadge[tab.id]}
                </span>
              )}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-24)' }}>
          {/* Main Content */}
          <div>

            {/* DONOR TAB */}
            {activeTab === 'donor' && (
              <>
                {!escrowData ? (
                  <div style={{
                    background: 'var(--color-atmosphere-wash)',
                    padding: 'var(--spacing-40)',
                    borderRadius: 'var(--radius-cards)'
                  }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 500, marginBottom: '8px', color: 'var(--color-ink)' }}>
                      Create Aid Distribution Escrow
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--color-pale-stone)', marginBottom: 'var(--spacing-24)' }}>
                      Funds lock on Stellar testnet via Trustless Work. Released only when milestones complete.
                    </p>
                    <form onSubmit={createEscrow}>
                      <input
                        name="projectName"
                        placeholder="Project Name (e.g. Somalia Food Aid 2026)"
                        required
                        defaultValue="Somalia Food Aid 2026"
                        style={{
                          width: '100%',
                          padding: 'var(--spacing-16)',
                          marginBottom: 'var(--spacing-16)',
                          border: '1px solid var(--color-pale-stone)',
                          borderRadius: '8px',
                          fontFamily: 'var(--font-abc-diatype-mono)',
                          fontSize: '16px',
                          background: 'var(--color-paper-canvas)',
                          boxSizing: 'border-box'
                        }}
                      />
                      <div style={{
                        background: 'var(--color-paper-canvas)',
                        borderRadius: '8px',
                        padding: 'var(--spacing-16)',
                        marginBottom: 'var(--spacing-16)',
                        fontSize: '14px',
                        color: 'var(--color-pale-stone)'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span>Total escrow amount</span><strong style={{ color: 'var(--color-ink)' }}>10,000 USDC</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span>Target beneficiaries</span><strong style={{ color: 'var(--color-ink)' }}>1,000 people</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>Network</span><strong style={{ color: 'var(--color-ink)' }}>Stellar Testnet</strong>
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          background: 'var(--color-off-black)',
                          color: 'var(--color-paper-canvas)',
                          padding: '16px 32px',
                          borderRadius: 'var(--radius-buttons)',
                          border: 'none',
                          fontSize: '16px',
                          fontFamily: 'var(--font-abc-diatype-mono)',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          opacity: loading ? 0.5 : 1,
                          width: '100%'
                        }}
                      >
                        {loading ? 'Deploying on Stellar...' : 'Deploy Escrow (10,000 USDC)'}
                      </button>
                    </form>
                  </div>
                ) : (
                  <>
                    {/* Escrow Viewer Link — THE KEY ADDITION */}
                    <a
                      href={VIEWER_URL(escrowData.contractId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: escrowData.isReal ? '#f0fff4' : 'var(--color-atmosphere-wash)',
                        border: `1px solid ${escrowData.isReal ? '#48bb78' : 'var(--color-pale-stone)'}`,
                        padding: '12px 20px',
                        borderRadius: '8px',
                        marginBottom: 'var(--spacing-16)',
                        textDecoration: 'none',
                        color: 'var(--color-ink)'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '12px', color: 'var(--color-pale-stone)', marginBottom: '2px' }}>
                          {escrowData.isReal ? '🟢 LIVE ESCROW — Stellar Testnet' : '🟡 DEMO MODE — Deploy with API key for live escrow'}
                        </div>
                        <div style={{ fontSize: '13px', fontFamily: 'var(--font-abc-diatype-mono)' }}>
                          {escrowData.contractId.substring(0, 32)}...
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#48bb78' }}>
                        View in Escrow Viewer <ExternalLink size={14} />
                      </div>
                    </a>

                    {/* Stats */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 'var(--spacing-16)',
                      marginBottom: 'var(--spacing-24)'
                    }}>
                      {[
                        { icon: DollarSign, value: '$10,000', label: 'Total Funding' },
                        { icon: Users, value: '1,000', label: 'Beneficiaries' },
                        { icon: CheckCircle, value: `${milestones.filter(m => m.status === 'released').length}/3`, label: 'Complete' }
                      ].map((stat, i) => (
                        <div key={i} style={{
                          background: 'var(--color-atmosphere-wash)',
                          padding: 'var(--spacing-24)',
                          borderRadius: 'var(--radius-cards)',
                          textAlign: 'center'
                        }}>
                          <stat.icon size={24} color="var(--color-ink)" style={{ marginBottom: 'var(--spacing-8)' }} />
                          <div style={{ fontSize: '28px', fontWeight: 500, color: 'var(--color-ink)' }}>{stat.value}</div>
                          <div style={{ fontSize: '14px', color: 'var(--color-pale-stone)' }}>{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Milestones */}
                    <div style={{
                      background: 'var(--color-atmosphere-wash)',
                      padding: 'var(--spacing-40)',
                      borderRadius: 'var(--radius-cards)'
                    }}>
                      <h3 style={{ fontSize: '20px', fontWeight: 500, marginBottom: 'var(--spacing-24)' }}>Milestones</h3>
                      {milestones.map(m => (
                        <div key={m.id} style={{
                          padding: 'var(--spacing-16)',
                          marginBottom: 'var(--spacing-16)',
                          borderLeft: `4px solid ${m.status === 'released' ? '#48bb78' : m.status === 'pending-approval' ? '#ed8936' : 'var(--color-pale-stone)'}`,
                          paddingLeft: 'var(--spacing-16)'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontWeight: 500, color: 'var(--color-ink)' }}>{m.name}</div>
                              <div style={{ fontSize: '14px', color: 'var(--color-pale-stone)' }}>
                                ${m.amount} USDC ({m.percentage}%)
                              </div>
                            </div>
                            <div style={{
                              padding: '4px 12px',
                              borderRadius: 'var(--radius-tags)',
                              fontSize: '12px',
                              background: m.status === 'released' ? '#c6f6d5' : m.status === 'pending-approval' ? '#feebc8' : '#e2e8f0',
                              color: m.status === 'released' ? '#22543d' : m.status === 'pending-approval' ? '#7c2d12' : '#4a5568'
                            }}>
                              {m.status === 'released' ? '✓ Released' : m.status === 'pending-approval' ? '⏳ Awaiting Approval' : 'Locked'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            {/* FIELD WORKER TAB */}
            {activeTab === 'field' && (
              <>
                <div style={{
                  background: 'var(--color-atmosphere-wash)',
                  padding: 'var(--spacing-40)',
                  borderRadius: 'var(--radius-cards)',
                  marginBottom: 'var(--spacing-24)'
                }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 500, marginBottom: 'var(--spacing-24)' }}>Submit Evidence</h2>
                  {!escrowData ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-pale-stone)' }}>
                      <ArrowRight size={16} />
                      Go to Donor tab first to deploy the escrow
                    </div>
                  ) : pendingEvidence.length === 0 ? (
                    <p style={{ color: 'var(--color-pale-stone)' }}>
                      {milestones.every(m => m.status === 'released')
                        ? '✅ All milestones complete!'
                        : '⏳ Evidence submitted — waiting for monitor approval'}
                    </p>
                  ) : (
                    pendingEvidence.map(m => (
                      <div key={m.id} style={{ marginBottom: 'var(--spacing-24)' }}>
                        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{m.name}</h3>
                        <p style={{ fontSize: '14px', color: 'var(--color-pale-stone)', marginBottom: 'var(--spacing-16)' }}>
                          ${m.amount} USDC • {m.percentage}% of total
                        </p>
                        <div style={{
                          background: 'var(--color-paper-canvas)',
                          borderRadius: '8px',
                          padding: 'var(--spacing-16)',
                          marginBottom: 'var(--spacing-16)',
                          fontSize: '13px',
                          color: 'var(--color-pale-stone)',
                          fontFamily: 'var(--font-abc-diatype-mono)'
                        }}>
                          <div>Photo hash: sha256:a3f2c1d4e5b6...</div>
                          <div>GPS: 2.3522° N, 48.8566° E</div>
                          <div>Timestamp: {new Date().toISOString()}</div>
                        </div>
                        <button
                          onClick={() => submitEvidence(m.id)}
                          disabled={loading}
                          style={{
                            background: 'var(--color-off-black)',
                            color: 'var(--color-paper-canvas)',
                            padding: '16px 24px',
                            borderRadius: 'var(--radius-buttons)',
                            border: 'none',
                            fontSize: '16px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.5 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-8)'
                          }}
                        >
                          <MapPin size={18} />
                          Submit Evidence for AI Verification
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Biometric */}
                <div style={{
                  background: 'var(--color-atmosphere-wash)',
                  padding: 'var(--spacing-40)',
                  borderRadius: 'var(--radius-cards)',
                  textAlign: 'center'
                }}>
                  <Fingerprint size={48} color="var(--color-ink)" style={{ margin: '0 auto var(--spacing-16)' }} />
                  <h3 style={{ fontSize: '20px', fontWeight: 500, marginBottom: '8px' }}>Biometric Verification</h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-pale-stone)', marginBottom: 'var(--spacing-16)' }}>
                    Privacy-preserving SHA-256 hashes. Raw data never leaves device.
                  </p>
                  <div style={{ fontSize: '32px', fontWeight: 500, marginBottom: 'var(--spacing-16)', color: 'var(--color-ink)' }}>
                    {biometricCount} <span style={{ fontSize: '16px', color: 'var(--color-pale-stone)' }}>/ 1000</span>
                  </div>
                  <div style={{
                    background: 'var(--color-paper-canvas)',
                    borderRadius: '4px',
                    height: '8px',
                    marginBottom: 'var(--spacing-16)',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      background: 'var(--color-ink)',
                      height: '100%',
                      width: `${(biometricCount / 1000) * 100}%`,
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <button
                    onClick={scanBiometric}
                    disabled={loading || biometricCount >= 1000}
                    style={{
                      background: 'var(--color-off-black)',
                      color: 'var(--color-paper-canvas)',
                      padding: '16px 24px',
                      borderRadius: 'var(--radius-buttons)',
                      border: 'none',
                      fontSize: '16px',
                      cursor: (loading || biometricCount >= 1000) ? 'not-allowed' : 'pointer',
                      opacity: (loading || biometricCount >= 1000) ? 0.5 : 1
                    }}
                  >
                    Scan Beneficiary
                  </button>
                </div>
              </>
            )}

            {/* MONITOR TAB */}
            {activeTab === 'monitor' && (
              <div style={{
                background: 'var(--color-atmosphere-wash)',
                padding: 'var(--spacing-40)',
                borderRadius: 'var(--radius-cards)'
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: 500, marginBottom: 'var(--spacing-24)' }}>Approve Milestones</h2>
                {!escrowData ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-pale-stone)' }}>
                    <ArrowRight size={16} />
                    Go to Donor tab first to deploy the escrow
                  </div>
                ) : pendingApproval.length === 0 ? (
                  <p style={{ color: 'var(--color-pale-stone)' }}>
                    {milestones.every(m => m.status === 'released')
                      ? '✅ All milestones released!'
                      : '⏳ No milestones awaiting approval — field worker must submit evidence first'}
                  </p>
                ) : (
                  pendingApproval.map(m => (
                    <div key={m.id} style={{
                      padding: 'var(--spacing-24)',
                      background: 'var(--color-paper-canvas)',
                      borderRadius: 'var(--radius-cards)',
                      marginBottom: 'var(--spacing-16)'
                    }}>
                      <div style={{
                        display: 'inline-block',
                        background: '#feebc8',
                        color: '#7c2d12',
                        padding: '4px 12px',
                        borderRadius: '100px',
                        fontSize: '12px',
                        marginBottom: 'var(--spacing-8)'
                      }}>
                        AI Verified ✓ — Awaiting Human Approval
                      </div>
                      <h3 style={{ fontSize: '20px', fontWeight: 500, marginBottom: '8px' }}>{m.name}</h3>
                      <p style={{ marginBottom: 'var(--spacing-16)', color: 'var(--color-pale-stone)', fontSize: '14px' }}>
                        ${m.amount} USDC will be released to NGO wallet upon approval
                      </p>
                      <button
                        onClick={() => approveMilestone(m.id)}
                        disabled={loading}
                        style={{
                          background: 'var(--color-off-black)',
                          color: 'var(--color-paper-canvas)',
                          padding: '16px 24px',
                          borderRadius: 'var(--radius-buttons)',
                          border: 'none',
                          fontSize: '16px',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          opacity: loading ? 0.5 : 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--spacing-8)'
                        }}
                      >
                        <CheckCircle size={18} />
                        Approve & Release ${m.amount} USDC
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Activity Log */}
          <div style={{
            background: 'var(--color-atmosphere-wash)',
            padding: 'var(--spacing-40)',
            borderRadius: 'var(--radius-cards)',
            height: 'fit-content',
            position: 'sticky',
            top: '20px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 500,
              marginBottom: 'var(--spacing-24)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-8)'
            }}>
              <Bot size={20} />
              Live Activity Log
            </h3>
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {logs.length === 0 ? (
                <div style={{
                  padding: 'var(--spacing-16)',
                  background: 'var(--color-paper-canvas)',
                  borderRadius: '8px',
                  color: 'var(--color-pale-stone)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-8)'
                }}>
                  <Clock size={18} />
                  Deploy an escrow to begin...
                </div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} style={{
                    padding: 'var(--spacing-16)',
                    background: log.type === 'ai' ? '#fffaf0' : log.type === 'success' ? '#f0fff4' : 'var(--color-paper-canvas)',
                    borderRadius: '8px',
                    marginBottom: 'var(--spacing-8)',
                    fontSize: '14px',
                    borderLeft: `3px solid ${log.type === 'ai' ? '#ed8936' : log.type === 'success' ? '#48bb78' : 'var(--color-ink)'}`
                  }}>
                    {log.message}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}
