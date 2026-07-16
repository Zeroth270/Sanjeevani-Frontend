import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockPapers } from '../lib/mockData';
import { statusBadgeClass, formatDate } from '../lib/utils';

const MOCK_USERS = [
  { id: 'u1', name: 'Dr. Ananya Sharma', email: 'ananya@iitb.ac.in', role: 'TTO_OFFICER', papersCount: 14 },
  { id: 'u2', name: 'Prof. Kiran Reddy', email: 'kiran@iitb.ac.in', role: 'RESEARCHER', papersCount: 8 },
  { id: 'u3', name: 'Dr. Meera Joshi', email: 'meera@iitb.ac.in', role: 'RESEARCHER', papersCount: 12 },
  { id: 'u4', name: 'Rahul Gupta', email: 'rahul@iitb.ac.in', role: 'RESEARCHER', papersCount: 6 },
];

export default function InstitutionAdmin() {
  const { isAdmin, user } = useAuth();
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  const papers = mockPapers.content;
  const totalMol = papers.reduce((a, p) => a + (p.moleculeCount || 0), 0);
  const processed = papers.filter(p => p.status === 'PROCESSED').length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>Institution Admin</h1>
        <p style={{ fontSize: '.85rem', color: '#64748b' }}>{user?.institution || 'Your Institution'} · Manage users, papers, and IP pipeline</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        {[
          { label: 'Total Users', value: MOCK_USERS.length, color: '#f1f5f9' },
          { label: 'Papers Submitted', value: papers.length, color: '#14b8a6' },
          { label: 'Molecules Extracted', value: totalMol, color: '#2dd4bf' },
          { label: 'Papers Processed', value: `${processed}/${papers.length}`, color: '#4ade80' },
        ].map(({ label, value, color }) => (
          <div key={label} className="glass-card" style={{ padding: '20px 22px' }}>
            <div style={{ fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: '#64748b', marginBottom: 8 }}>{label}</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color, lineHeight: 1 }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Users */}
      <div>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 14 }}>👥 Institution Members</h2>
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          <table className="data-table">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Papers</th></tr></thead>
            <tbody>
              {MOCK_USERS.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, display: 'grid', placeItems: 'center', fontSize: '.72rem', fontWeight: 700, background: 'linear-gradient(135deg,#0d9488,#2dd4bf)', color: '#0f172a' }}>{u.name[0]}</div>
                      <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '.875rem' }}>{u.name}</span>
                    </div>
                  </td>
                  <td><span style={{ fontSize: '.85rem', color: '#94a3b8' }}>{u.email}</span></td>
                  <td>
                    <span style={{ fontSize: '.7rem', fontWeight: 700, padding: '3px 9px', borderRadius: 99,
                      background: u.role === 'TTO_OFFICER' ? 'rgba(20,184,166,.15)' : 'rgba(100,116,139,.15)',
                      color: u.role === 'TTO_OFFICER' ? '#2dd4bf' : '#94a3b8',
                      border: u.role === 'TTO_OFFICER' ? '1px solid rgba(20,184,166,.3)' : '1px solid rgba(100,116,139,.3)' }}>
                      {u.role.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.85rem', color: '#2dd4bf' }}>{u.papersCount}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Papers */}
      <div>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 14 }}>📄 All Institution Papers</h2>
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          <table className="data-table">
            <thead><tr><th>Title</th><th>Authors</th><th>Date</th><th>Status</th><th>Molecules</th><th></th></tr></thead>
            <tbody>
              {papers.map(p => (
                <tr key={p.id}>
                  <td><div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '.875rem', maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div></td>
                  <td><span style={{ fontSize: '.85rem', color: '#94a3b8' }}>{p.authors}</span></td>
                  <td><span style={{ fontSize: '.85rem', color: '#94a3b8' }}>{formatDate(p.publicationDate)}</span></td>
                  <td><span className={`badge ${statusBadgeClass(p.status)}`}>{p.status}</span></td>
                  <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.85rem', color: '#2dd4bf' }}>{p.moleculeCount ?? '—'}</span></td>
                  <td><Link to={`/papers/${p.id}`} style={{ fontSize: '.82rem', fontWeight: 600, color: '#14b8a6', textDecoration: 'none' }} id={`admin-paper-link-${p.id}`}>View →</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
