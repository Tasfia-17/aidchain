import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      background: 'var(--color-paper-canvas)',
      borderBottom: '1px solid var(--color-pale-stone)',
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1432px',
        margin: '0 auto',
        padding: 'var(--spacing-16) var(--spacing-40)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{
          fontFamily: 'var(--font-untitled-serif)',
          fontSize: '24px',
          fontWeight: 400,
          color: 'var(--color-ink)',
          textDecoration: 'none',
          letterSpacing: '-0.02em'
        }}>
          AidChain
        </Link>
        
        <div style={{ display: 'flex', gap: 'var(--spacing-32)', alignItems: 'center' }}>
          <Link to="/platform" style={{
            color: location.pathname === '/platform' ? 'var(--color-ink)' : 'var(--color-off-black)',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 400,
            padding: '8px 10px',
            borderBottom: location.pathname === '/platform' ? '2px solid var(--color-ink)' : 'none'
          }}>
            Platform
          </Link>
          
          <Link to="/how-it-works" style={{
            color: location.pathname === '/how-it-works' ? 'var(--color-ink)' : 'var(--color-off-black)',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 400,
            padding: '8px 10px',
            borderBottom: location.pathname === '/how-it-works' ? '2px solid var(--color-ink)' : 'none'
          }}>
            How It Works
          </Link>
          
          <Link to="/dashboard" style={{
            background: 'var(--color-off-black)',
            color: 'var(--color-paper-canvas)',
            padding: '16px 24px',
            borderRadius: 'var(--radius-buttons)',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 400,
            transition: 'transform 0.2s',
            display: 'inline-block'
          }}
          onMouseEnter={e => e.target.style.transform = 'translateY(-1px)'}
          onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
          >
            Launch App →
          </Link>
        </div>
      </div>
    </nav>
  );
}
