import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { dashboardApi } from '../lib/api';
import { mockSummary } from '../lib/mockData';
import { CountdownClock } from '../components/CountdownClock';
import { urgencyBg, urgencyLabel, truncateSMILES } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

function StatCard({ label, value, sub, color }) {
  return (
    <div className="glass-card" style={{ padding: '22px 24px' }}>
      <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.1em', color: '#64748b', marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ fontSize: '2.6rem', fontWeight: 800, fontFamily: 'JetBrains Mono, monospace',
        color, lineHeight: 1, marginBottom: 8 }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: '0.75rem', color: '#475569' }}>{sub}</div>}
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const { data: summary, isLoading } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: async () => {
      try { return (await dashboardApi.summary()).data; } catch { return mockSummary; }
    },
    staleTime: 30_000,
    refetchInterval: 60_000,
  });

  const s = summary || mockSummary;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>
            Welcome back, <span className="gradient-text">{user?.name || 'Researcher'}</span>
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            {user?.institution || 'Your Institution'} &nbsp;·&nbsp;{' '}
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Link to="/papers/upload" className="btn-primary" id="dash-upload-btn"
          style={{ flexShrink: 0 }}>
          ⬆ Upload Paper
        </Link>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        <StatCard label="Papers Scanned (Month)" value={isLoading ? '—' : s.papersScannedThisMonth}
          sub="vs 28 last month" color="#2dd4bf" />
        <StatCard label="Novel Molecules Found"  value={isLoading ? '—' : s.novelMoleculesFound}
          sub="flagged for TTO review" color="#14b8a6" />
        <StatCard label="Closing Within 30 Days" value={isLoading ? '—' : s.closingWithin30Days}
          sub="active disclosure windows" color="#fbbf24" />
        <StatCard label="Expired Unfiled"        value={isLoading ? '—' : s.expiredUnfiled}
          sub="missed Section 31 windows" color="#f87171" />
      </div>

      {/* Urgency banner */}
      {s.closingWithin30Days > 0 && (
        <div className="urgency-stripe animate-urgency-pulse">
          <span style={{ fontSize: '1.4rem' }}>🚨</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, color: '#f87171', fontSize: '0.9rem', marginBottom: 2 }}>
              {s.closingWithin30Days} disclosure window{s.closingWithin30Days !== 1 ? 's' : ''} closing within 30 days
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Review the list below and coordinate with your patent attorney immediately.
            </div>
          </div>
          <Link to="/alerts" className="btn-danger" id="dash-view-alerts-btn">View Alerts →</Link>
        </div>
      )}

      {/* Closing windows table */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9' }}>
            ⏱ Disclosure Windows Closing Soon
          </h2>
          <Link to="/alerts" style={{ fontSize: '0.82rem', color: '#14b8a6', textDecoration: 'none' }}
            id="dash-all-alerts-link">
            View all alerts →
          </Link>
        </div>
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
              <div className="spinner" style={{ width: 28, height: 28 }}></div>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Molecule</th>
                  <th>SMILES</th>
                  <th>Deadline</th>
                  <th>Countdown</th>
                  <th>Urgency</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {s.closingWindowsList.map((w) => (
                  <tr key={w.id}>
                    <td><span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.875rem' }}>{w.moleculeName}</span></td>
                    <td><span className="chem-mono">{truncateSMILES(w.smilesString, 28)}</span></td>
                    <td><span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                      {new Date(w.deadlineDate).toLocaleDateString('en-IN')}
                    </span></td>
                    <td><CountdownClock deadlineDate={w.deadlineDate} compact /></td>
                    <td>
                      <span className={`badge ${urgencyBg(w.daysLeft)}`}>{urgencyLabel(w.daysLeft)}</span>
                    </td>
                    <td>
                      <Link to={`/molecules/${w.moleculeId}`} style={{ fontSize: '0.82rem', fontWeight: 600,
                        color: '#14b8a6', textDecoration: 'none' }}
                        id={`dash-mol-link-${w.moleculeId}`}>
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
