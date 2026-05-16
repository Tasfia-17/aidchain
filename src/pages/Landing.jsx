import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, Award, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }
  })
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
};

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
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0}>
            <span style={{
              display: 'inline-block',
              background: 'var(--color-atmosphere-wash)',
              color: 'var(--color-ink)',
              padding: '6px 16px',
              borderRadius: 'var(--radius-tags)',
              fontSize: '13px',
              fontFamily: 'var(--font-abc-diatype-mono)',
              marginBottom: 'var(--spacing-24)',
              letterSpacing: '0.02em'
            }}>
              Built on Stellar + Trustless Work
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            style={{
              fontFamily: 'var(--font-untitled-serif)',
              fontSize: 'clamp(48px, 7vw, 80px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: 'var(--color-ink)',
              maxWidth: '860px',
              margin: '0 auto var(--spacing-24)'
            }}
          >
            Aid that reaches people,{' '}
            <span style={{ color: 'var(--color-pale-stone)' }}>not middlemen</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            style={{
              fontSize: '18px',
              lineHeight: 1.5,
              color: 'var(--color-pale-stone)',
              maxWidth: '520px',
              margin: '0 auto var(--spacing-40)',
              letterSpacing: '-0.01em'
            }}
          >
            Milestone-based escrow with AI verification and biometric proof.
            Funds release only when conditions are met, on-chain.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            style={{ display: 'flex', gap: 'var(--spacing-16)', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/dashboard" style={{
              background: 'var(--color-off-black)',
              color: 'var(--color-paper-canvas)',
              padding: '16px 32px',
              borderRadius: 'var(--radius-buttons)',
              textDecoration: 'none',
              fontSize: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Launch App <ArrowRight size={16} />
            </Link>
            <a
              href="https://viewer.trustlesswork.com/CAPYVLX7GXIM3UQI3BYCKUOTFIFFNRRBALQFX3LX7LZ4Q4L3YL5UWG2W"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'transparent',
                color: 'var(--color-off-black)',
                padding: '16px 32px',
                borderRadius: 'var(--radius-buttons)',
                textDecoration: 'none',
                fontSize: '16px',
                border: '1px solid var(--color-off-black)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              View Live Escrow
            </a>
          </motion.div>
        </motion.div>

        {/* Animated escrow flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: '72px',
            background: 'var(--color-atmosphere-wash)',
            borderRadius: 'var(--radius-cards)',
            padding: '48px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0',
            flexWrap: 'wrap',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {[
            { label: 'Donor', sub: 'Locks funds' },
            { label: 'Escrow', sub: 'Smart contract', highlight: true },
            { label: 'AI Agent', sub: 'Verifies evidence' },
            { label: 'Monitor', sub: 'Approves' },
            { label: 'NGO', sub: 'Receives funds' }
          ].map((node, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.15, duration: 0.4, ease: 'backOut' }}
                style={{
                  background: node.highlight ? 'var(--color-ink)' : 'var(--color-paper-canvas)',
                  color: node.highlight ? 'var(--color-paper-canvas)' : 'var(--color-ink)',
                  borderRadius: '16px',
                  padding: '16px 24px',
                  textAlign: 'center',
                  minWidth: '100px'
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 500 }}>{node.label}</div>
                <div style={{
                  fontSize: '12px',
                  opacity: 0.6,
                  marginTop: '4px',
                  fontFamily: 'var(--font-abc-diatype-mono)'
                }}>
                  {node.sub}
                </div>
              </motion.div>
              {i < arr.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9 + i * 0.15, duration: 0.3 }}
                  style={{
                    width: '40px',
                    height: '2px',
                    background: 'var(--color-ink)',
                    opacity: 0.2,
                    transformOrigin: 'left'
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section style={{
        maxWidth: '1432px',
        margin: '0 auto',
        padding: '0 var(--spacing-40) var(--spacing-80)'
      }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-untitled-serif)',
            fontSize: '40px',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: 'var(--color-ink)',
            marginBottom: 'var(--spacing-40)',
            textAlign: 'center'
          }}
        >
          How it works
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--spacing-24)'
          }}
        >
          {[
            {
              icon: Shield,
              title: 'Non-Custodial Escrow',
              desc: 'Funds locked in Trustless Work smart contracts on Stellar. Released only when milestones complete. No intermediary holds funds.'
            },
            {
              icon: Zap,
              title: 'AI Verification',
              desc: 'Autonomous agents verify field evidence before human approval. Checks photo hash uniqueness, GPS zone, and timestamp validity.'
            },
            {
              icon: Users,
              title: 'Biometric Proof',
              desc: 'Privacy-preserving SHA-256 hashes prove unique beneficiary distribution. Raw data never leaves the device.'
            },
            {
              icon: Award,
              title: 'Impact Certificates',
              desc: 'Hypercerts minted after all milestones complete. Creates a verifiable record of impact for retroactive funding.'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              style={{
                background: 'var(--color-atmosphere-wash)',
                padding: 'var(--spacing-40)',
                borderRadius: 'var(--radius-cards)',
                cursor: 'default'
              }}
            >
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
                fontSize: '15px',
                color: 'var(--color-pale-stone)',
                lineHeight: 1.5
              }}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Process */}
      <section style={{
        maxWidth: '1432px',
        margin: '0 auto',
        padding: '0 var(--spacing-40) var(--spacing-80)'
      }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-untitled-serif)',
            fontSize: '40px',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: 'var(--color-ink)',
            marginBottom: 'var(--spacing-40)',
            textAlign: 'center'
          }}
        >
          The Process
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            { step: '01', title: 'Deploy Escrow', desc: 'Donor locks funds in milestone-based smart contract on Stellar' },
            { step: '02', title: 'Submit Evidence', desc: 'Field workers upload photo hashes and GPS coordinates per milestone' },
            { step: '03', title: 'AI Verification', desc: 'Autonomous agents verify evidence authenticity and flag anomalies' },
            { step: '04', title: 'Biometric Scan', desc: 'Beneficiaries scanned to prove unique distribution, no duplicates' },
            { step: '05', title: 'Approve and Release', desc: 'Field monitor approves, funds auto-release to NGO wallet' },
            { step: '06', title: 'Mint Certificate', desc: 'Hypercert generated with full evidence trail for retroactive funding' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                display: 'flex',
                gap: 'var(--spacing-24)',
                alignItems: 'flex-start',
                padding: 'var(--spacing-24) 0',
                borderBottom: i < 5 ? '1px solid rgba(0,0,0,0.08)' : 'none'
              }}
            >
              <div style={{
                fontFamily: 'var(--font-untitled-serif)',
                fontSize: '22px',
                color: 'var(--color-faint-text)',
                minWidth: '48px',
                paddingTop: '2px'
              }}>
                {item.step}
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 500, color: 'var(--color-ink)', marginBottom: '4px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--color-pale-stone)', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        maxWidth: '1432px',
        margin: '0 auto',
        padding: '0 var(--spacing-40) var(--spacing-80)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            background: 'var(--color-atmosphere-wash)',
            padding: 'var(--spacing-72)',
            borderRadius: 'var(--radius-cards)',
            textAlign: 'center'
          }}
        >
          <h2 style={{
            fontFamily: 'var(--font-untitled-serif)',
            fontSize: '40px',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: 'var(--color-ink)',
            marginBottom: 'var(--spacing-24)'
          }}>
            Ready to transform aid distribution?
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'var(--color-pale-stone)',
            marginBottom: 'var(--spacing-32)',
            maxWidth: '480px',
            margin: '0 auto var(--spacing-32)',
            lineHeight: 1.5
          }}>
            Every milestone verified on-chain. Every beneficiary counted. Every dollar tracked.
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-16)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/dashboard" style={{
              background: 'var(--color-off-black)',
              color: 'var(--color-paper-canvas)',
              padding: '16px 32px',
              borderRadius: 'var(--radius-buttons)',
              textDecoration: 'none',
              fontSize: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Launch Application <ArrowRight size={16} />
            </Link>
            <Link to="/how-it-works" style={{
              background: 'transparent',
              color: 'var(--color-off-black)',
              padding: '16px 32px',
              borderRadius: 'var(--radius-buttons)',
              textDecoration: 'none',
              fontSize: '16px',
              border: '1px solid var(--color-off-black)'
            }}>
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.08)', padding: 'var(--spacing-40)' }}>
        <div style={{
          maxWidth: '1432px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '14px',
          color: 'var(--color-faint-text)',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>AidChain. Built on Stellar with Trustless Work.</div>
          <div style={{ display: 'flex', gap: 'var(--spacing-24)' }}>
            <a href="https://docs.trustlesswork.com" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--color-subtle-link)', textDecoration: 'none' }}>
              Docs
            </a>
            <a href="https://github.com/Tasfia-17/aidchain" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--color-subtle-link)', textDecoration: 'none' }}>
              GitHub
            </a>
            <a href="https://viewer.trustlesswork.com/CAPYVLX7GXIM3UQI3BYCKUOTFIFFNRRBALQFX3LX7LZ4Q4L3YL5UWG2W"
              target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--color-subtle-link)', textDecoration: 'none' }}>
              Escrow Viewer
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
