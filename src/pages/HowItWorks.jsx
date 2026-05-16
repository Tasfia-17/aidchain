export default function HowItWorks() {
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
          marginBottom: 'var(--spacing-24)',
          textAlign: 'center'
        }}>
          How It Works
        </h1>

        <p style={{
          fontSize: '20px',
          lineHeight: 1.35,
          color: 'var(--color-pale-stone)',
          maxWidth: '700px',
          margin: '0 auto var(--spacing-72)',
          textAlign: 'center'
        }}>
          AidChain combines blockchain escrow, AI verification, and biometric proof to create transparent, accountable humanitarian aid distribution.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-40)' }}>
          {[
            {
              step: '01',
              title: 'Deploy Escrow',
              desc: 'Donor creates a multi-release escrow contract on Stellar blockchain. Funds are locked in a non-custodial smart contract with predefined milestones.',
              details: ['10,000 USDC locked', '3 milestones defined', 'Roles assigned (donor, NGO, field monitor)']
            },
            {
              step: '02',
              title: 'Submit Evidence',
              desc: 'Field workers on the ground upload evidence for each milestone: photo hashes and GPS coordinates proving aid distribution.',
              details: ['Photo hash (SHA-256)', 'GPS coordinates', 'Timestamp verification']
            },
            {
              step: '03',
              title: 'AI Verification',
              desc: 'Autonomous AI agents verify evidence before human approval. Checks photo hash uniqueness, GPS location validity, and timestamp accuracy.',
              details: ['94% confidence scoring', 'Automated checks', 'Reduces manual workload by 80%']
            },
            {
              step: '04',
              title: 'Biometric Proof',
              desc: 'Beneficiaries are scanned using iris or fingerprint readers. Biometric data is hashed locally—only the hash goes on-chain, preserving privacy.',
              details: ['One-way SHA-256 hashing', 'No raw biometric data stored', 'Proves unique distribution']
            },
            {
              step: '05',
              title: 'Approve & Release',
              desc: 'Field monitor reviews AI-verified evidence and approves the milestone. Smart contract automatically releases funds to the NGO.',
              details: ['Human final approval', 'Instant fund release', 'Transaction recorded on-chain']
            },
            {
              step: '06',
              title: 'Mint Hypercert',
              desc: 'After all milestones complete, an impact certificate (Hypercert) is minted. Contains beneficiaries served, cost per person, and evidence hashes.',
              details: ['Impact certificate NFT', 'Available for retroactive funding', 'Creates NGO reputation system']
            }
          ].map((item, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '100px 1fr',
              gap: 'var(--spacing-32)',
              padding: 'var(--spacing-40)',
              background: i % 2 === 0 ? 'var(--color-atmosphere-wash)' : 'transparent',
              borderRadius: 'var(--radius-cards)'
            }}>
              <div style={{
                fontFamily: 'var(--font-untitled-serif)',
                fontSize: '40px',
                color: 'var(--color-faint-text)',
                fontWeight: 400
              }}>
                {item.step}
              </div>
              <div>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                  marginBottom: 'var(--spacing-16)'
                }}>
                  {item.title}
                </h2>
                <p style={{
                  fontSize: '16px',
                  lineHeight: 1.35,
                  color: 'var(--color-pale-stone)',
                  marginBottom: 'var(--spacing-16)'
                }}>
                  {item.desc}
                </p>
                <ul style={{
                  listStyle: 'none',
                  fontSize: '14px',
                  color: 'var(--color-faint-text)',
                  lineHeight: 1.8
                }}>
                  {item.details.map((detail, j) => (
                    <li key={j}>→ {detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
