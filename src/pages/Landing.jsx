import { Link } from 'react-router-dom';
import { CheckCircle, Shield, Zap, Users, Globe, Award } from 'lucide-react';

export default function Landing() {
  return (
    <div style={{ background: 'var(--color-paper-canvas)' }}>
      {/* Hero */}
      <section style={{
        maxWidth: '1432px',
        margin: '0 auto',
        padding: 'var(--spacing-80) var(--spacing-40)',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontFamily: 'var(--font-untitled-serif)',
          fontSize: '80px',
          fontWeight: 400,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: 'var(--color-ink)',
          marginBottom: 'var(--spacing-24)',
          maxWidth: '900px',
          margin: '0 auto var(--spacing-24)'
        }}>
          Transparent Aid Distribution
        </h1>
        
        <p style={{
          fontSize: '20px',
          lineHeight: 1.35,
          color: 'var(--color-pale-stone)',
          maxWidth: '600px',
          margin: '0 auto var(--spacing-40)',
          letterSpacing: '-0.02em'
        }}>
          Milestone-based escrow with AI verification and biometric proof. Built on Stellar blockchain.
        </p>
        
        <div style={{ display: 'flex', gap: 'var(--spacing-16)', justifyContent: 'center' }}>
          <Link to="/dashboard" style={{
            background: 'var(--color-off-black)',
            color: 'var(--color-paper-canvas)',
            padding: '16px 32px',
            borderRadius: 'var(--radius-buttons)',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 400,
            display: 'inline-block'
          }}>
            Get Started
          </Link>
          
          <Link to="/how-it-works" style={{
            background: 'transparent',
            color: 'var(--color-off-black)',
            padding: '16px 32px',
            borderRadius: 'var(--radius-buttons)',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 400,
            border: '1px solid var(--color-off-black)',
            display: 'inline-block'
          }}>
            Learn More
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        maxWidth: '1432px',
        margin: '0 auto',
        padding: '0 var(--spacing-40) var(--spacing-80)',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--spacing-24)'
      }}>
        {[
          { value: '$288M', label: 'Saved from duplicate payments' },
          { value: '6M+', label: 'People reached globally' },
          { value: '70%', label: 'Faster distribution' }
        ].map((stat, i) => (
          <div key={i} style={{
            background: 'var(--color-atmosphere-wash)',
            padding: 'var(--spacing-40)',
            borderRadius: 'var(--radius-cards)',
            textAlign: 'center'
          }}>
            <div style={{
              fontFamily: 'var(--font-untitled-serif)',
              fontSize: '40px',
              fontWeight: 400,
              color: 'var(--color-ink)',
              marginBottom: 'var(--spacing-8)'
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '14px',
              color: 'var(--color-pale-stone)'
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section style={{
        maxWidth: '1432px',
        margin: '0 auto',
        padding: '0 var(--spacing-40) var(--spacing-80)'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-untitled-serif)',
          fontSize: '40px',
          fontWeight: 400,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: 'var(--color-ink)',
          marginBottom: 'var(--spacing-40)',
          textAlign: 'center'
        }}>
          How AidChain Works
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--spacing-24)'
        }}>
          {[
            {
              icon: Shield,
              title: 'Non-Custodial Escrow',
              desc: 'Funds locked in smart contracts on Stellar. Released only when milestones complete.'
            },
            {
              icon: Zap,
              title: 'AI Verification',
              desc: 'Autonomous agents verify evidence before human approval. 94% confidence scoring.'
            },
            {
              icon: Users,
              title: 'Biometric Proof',
              desc: 'Privacy-preserving hashes prove unique beneficiary distribution without storing sensitive data.'
            },
            {
              icon: Award,
              title: 'Impact Certificates',
              desc: 'Hypercerts minted after completion. Available for retroactive funding marketplace.'
            }
          ].map((feature, i) => (
            <div key={i} style={{
              background: 'var(--color-atmosphere-wash)',
              padding: 'var(--spacing-40)',
              borderRadius: 'var(--radius-cards)'
            }}>
              <feature.icon size={32} color="var(--color-ink)" style={{ marginBottom: 'var(--spacing-16)' }} />
              <h3 style={{
                fontSize: '20px',
                fontWeight: 500,
                color: 'var(--color-ink)',
                marginBottom: 'var(--spacing-8)'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '16px',
                color: 'var(--color-pale-stone)',
                lineHeight: 1.35
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section style={{
        maxWidth: '1432px',
        margin: '0 auto',
        padding: '0 var(--spacing-40) var(--spacing-80)'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-untitled-serif)',
          fontSize: '40px',
          fontWeight: 400,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: 'var(--color-ink)',
          marginBottom: 'var(--spacing-40)',
          textAlign: 'center'
        }}>
          The Process
        </h2>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-24)'
        }}>
          {[
            { step: '01', title: 'Deploy Escrow', desc: 'Donor locks funds in milestone-based smart contract' },
            { step: '02', title: 'Submit Evidence', desc: 'Field workers upload photo hashes and GPS coordinates' },
            { step: '03', title: 'AI Verification', desc: 'Autonomous agents verify evidence authenticity' },
            { step: '04', title: 'Biometric Scan', desc: 'Beneficiaries scanned to prove unique distribution' },
            { step: '05', title: 'Approve & Release', desc: 'Field monitor approves, funds auto-release to NGO' },
            { step: '06', title: 'Mint Certificate', desc: 'Hypercert generated for retroactive funding' }
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: 'var(--spacing-24)',
              alignItems: 'flex-start',
              padding: 'var(--spacing-24)',
              borderBottom: i < 5 ? '1px solid var(--color-pale-stone)' : 'none'
            }}>
              <div style={{
                fontFamily: 'var(--font-untitled-serif)',
                fontSize: '24px',
                color: 'var(--color-faint-text)',
                minWidth: '60px'
              }}>
                {item.step}
              </div>
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                  marginBottom: 'var(--spacing-8)'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: 'var(--color-pale-stone)'
                }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        maxWidth: '1432px',
        margin: '0 auto',
        padding: '0 var(--spacing-40) var(--spacing-80)'
      }}>
        <div style={{
          background: 'var(--color-atmosphere-wash)',
          padding: 'var(--spacing-72)',
          borderRadius: 'var(--radius-cards)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-untitled-serif)',
            fontSize: '40px',
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: 'var(--color-ink)',
            marginBottom: 'var(--spacing-24)'
          }}>
            Ready to Transform Aid Distribution?
          </h2>
          <p style={{
            fontSize: '20px',
            color: 'var(--color-pale-stone)',
            marginBottom: 'var(--spacing-32)',
            maxWidth: '600px',
            margin: '0 auto var(--spacing-32)'
          }}>
            Join NGOs and donors using blockchain for transparent, accountable humanitarian aid.
          </p>
          <Link to="/dashboard" style={{
            background: 'var(--color-off-black)',
            color: 'var(--color-paper-canvas)',
            padding: '16px 32px',
            borderRadius: 'var(--radius-buttons)',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 400,
            display: 'inline-block'
          }}>
            Launch Application
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--color-pale-stone)',
        padding: 'var(--spacing-40)',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1432px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '14px',
          color: 'var(--color-faint-text)'
        }}>
          <div>© 2026 AidChain. Built on Stellar.</div>
          <div style={{ display: 'flex', gap: 'var(--spacing-24)' }}>
            <a href="https://docs.trustlesswork.com" target="_blank" rel="noopener noreferrer" style={{
              color: 'var(--color-subtle-link)',
              textDecoration: 'none'
            }}>
              Documentation
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{
              color: 'var(--color-subtle-link)',
              textDecoration: 'none'
            }}>
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
