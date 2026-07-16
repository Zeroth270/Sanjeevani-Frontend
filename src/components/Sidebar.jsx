import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { to: '/dashboard',    emoji: '⬡',  label: 'Dashboard'     },
  { to: '/papers',       emoji: '📄', label: 'Papers'         },
  { to: '/papers/upload',emoji: '⬆',  label: 'Upload Paper'  },
  { to: '/alerts',       emoji: '🔔', label: 'Alerts'         },
  { to: '/settings',     emoji: '⚙',  label: 'Settings'      },
];
const adminItems = [
  { to: '/admin/institution', emoji: '🏛', label: 'Institution Admin' },
];

export function Sidebar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <aside style={{
      width: 224,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      background: 'rgba(10,18,35,0.98)',
      borderRight: '1px solid #1e293b',
      backdropFilter: 'blur(12px)',
      zIndex: 30,
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'block', color: 'inherit' }} id="brand-logo-link">
        <div style={{ padding: '20px 16px 18px', borderBottom: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: 'linear-gradient(135deg,#0d9488,#14b8a6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15, fontWeight: 800, color: '#0f172a', flexShrink: 0,
            }}>S</div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.2 }}>
                Sanjeevani
              </div>
              <div style={{ fontSize: '0.68rem', color: '#475569', marginTop: 1 }}>
                Novelty Scanner
              </div>
            </div>
          </div>
        </div>
      </Link>


      {/* Nav items */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(({ to, emoji, label }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              <span style={{ fontSize: '1rem', width: 20, textAlign: 'center' }}>{emoji}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        {isAdmin && (
          <>
            <div style={{ padding: '20px 12px 6px', fontSize: '0.65rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em', color: '#334155' }}>
              Admin
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {adminItems.map(({ to, emoji, label }) => (
                <NavLink key={to} to={to}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                  <span style={{ fontSize: '1rem', width: 20, textAlign: 'center' }}>{emoji}</span>
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          </>
        )}
      </nav>

      {/* User footer */}
      <div style={{ padding: '10px', borderTop: '1px solid #1e293b' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', borderRadius: 10,
          background: '#1e293b', marginBottom: 4,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg,#0d9488,#2dd4bf)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: '#0f172a',
          }}>
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0', lineHeight: 1.3,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name || 'Researcher'}
            </div>
            <div style={{ fontSize: '0.65rem', color: '#475569', lineHeight: 1.2 }}>
              {user?.role?.replace(/_/g, ' ') || 'RESEARCHER'}
            </div>
          </div>
        </div>
        <button className="nav-link" onClick={() => { logout(); navigate('/'); }} id="logout-btn">
          <span style={{ fontSize: '1rem', width: 20, textAlign: 'center' }}>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
