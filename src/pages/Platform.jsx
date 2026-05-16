export default function Platform() {
  return (
    <div style={{ background: 'var(--color-paper-canvas)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1432px', margin: '0 auto', padding: 'var(--spacing-80) var(--spacing-40)' }}>
        <h1 style={{
          fontFamily: 'var(--font-untitled-serif)',
          fontSize: '40px',
          fontWeight: 400,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: 'var(--color-ink)',
          marginBottom: 'var(--spacing-40)'
        }}>
          Platform Overview
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-40)' }}>
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 500,
              marginBottom: 'var(--spacing-16)',
              color: 'var(--color-ink)'
            }}>
              Built on Stellar
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: 1.35,
              color: 'var(--color-pale-stone)',
              marginBottom: 'var(--spacing-24)'
            }}>
              AidChain leverages Stellar's blockchain for fast, low-cost transactions. Smart contracts run on Soroban, Stellar's smart contract platform, ensuring security and transparency.
            </p>

            <h2 style={{
              fontSize: '24px',
              fontWeight: 500,
              marginBottom: 'var(--spacing-16)',
              color: 'var(--color-ink)'
            }}>
              Trustless Work Integration
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: 1.35,
              color: 'var(--color-pale-stone)',
              marginBottom: 'var(--spacing-24)'
            }}>
              Powered by Trustless Work's escrow-as-a-service infrastructure. Multi-release escrows with milestone-based conditional releases ensure funds only move when work is verified.
            </p>

            <h2 style={{
              fontSize: '24px',
              fontWeight: 500,
              marginBottom: 'var(--spacing-16)',
              color: 'var(--color-ink)'
            }}>
              WFP Building Blocks Compatible
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: 1.35,
              color: 'var(--color-pale-stone)'
            }}>
              Designed to integrate with the UN World Food Programme's Building Blocks system, which has already reached 6 million people and processed over 40 million transactions.
            </p>
          </div>

          <div style={{
            background: 'var(--color-atmosphere-wash)',
            padding: 'var(--spacing-40)',
            borderRadius: 'var(--radius-cards)'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 500,
              marginBottom: 'var(--spacing-24)',
              color: 'var(--color-ink)'
            }}>
              Technical Stack
            </h3>
            <ul style={{
              listStyle: 'none',
              fontSize: '16px',
              lineHeight: 1.8,
              color: 'var(--color-pale-stone)'
            }}>
              <li>→ Stellar (Soroban) blockchain</li>
              <li>→ Trustless Work SDK</li>
              <li>→ AI verification agents</li>
              <li>→ SHA-256 biometric hashing</li>
              <li>→ Hypercerts protocol</li>
              <li>→ IPFS for evidence storage</li>
              <li>→ Chainlink oracles (planned)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
