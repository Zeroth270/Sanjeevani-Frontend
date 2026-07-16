import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { alertsApi } from '../lib/api';
import { mockAlerts } from '../lib/mockData';
import { timeAgo } from '../lib/utils';

const TYPE_CONFIG = {
  '7_DAY':               { bg: 'rgba(239,68,68,.1)',  border: 'rgba(239,68,68,.25)',  color: '#f87171', label: '7-Day Alert' },
  '30_DAY':              { bg: 'rgba(251,191,36,.1)', border: 'rgba(251,191,36,.25)', color: '#fbbf24', label: '30-Day Alert' },
  EXPIRED:               { bg: 'rgba(100,116,139,.1)',border: 'rgba(100,116,139,.25)',color: '#94a3b8', label: 'Expired' },
  NOVEL_MOLECULE_FOUND:  { bg: 'rgba(20,184,166,.1)', border: 'rgba(20,184,166,.25)', color: '#14b8a6', label: 'Novel Molecule' },
  ROUTE_NOVEL:           { bg: 'rgba(16,185,129,.1)', border: 'rgba(16,185,129,.25)', color: '#34d399', label: 'Route Novel' },
};
const FILTERS = [
  { value: '', label: 'All Alerts' },
  { value: '7_DAY', label: '7-Day' },
  { value: '30_DAY', label: '30-Day' },
  { value: 'NOVEL_MOLECULE_FOUND', label: 'Novel Found' },
  { value: 'ROUTE_NOVEL', label: 'Route Novel' },
  { value: 'EXPIRED', label: 'Expired' },
];

export default function Alerts() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState('');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [localAlerts, setLocalAlerts] = useState(mockAlerts);

  const { data: serverAlerts } = useQuery({
    queryKey: ['alerts', filter],
    queryFn: async () => { try { return (await alertsApi.list({ type: filter || undefined })).data; } catch { return null; } },
    staleTime: 15_000,
  });

  const markRead = useMutation({ mutationFn: (id) => alertsApi.markRead(id), onSuccess: () => qc.invalidateQueries(['alerts']) });

  function handleMarkRead(id) { markRead.mutate(id); setLocalAlerts(p => p.map(a => a.id === id ? { ...a, read: true } : a)); }
  function handleMarkAllRead() { setLocalAlerts(p => p.map(a => ({ ...a, read: true }))); }

  const alerts = serverAlerts || localAlerts;
  const filtered = alerts.filter(a => { if (showUnreadOnly && a.read) return false; if (filter && a.type !== filter) return false; return true; });
  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9' }}>Alerts</h1>
            {unreadCount > 0 && (
              <span style={{ fontSize: '.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: 'rgba(239,68,68,.15)', color: '#f87171', border: '1px solid rgba(239,68,68,.3)' }}>{unreadCount} unread</span>
            )}
          </div>
          <p style={{ fontSize: '.85rem', color: '#64748b', marginTop: 4 }}>Patent deadline notifications for your disclosure windows</p>
        </div>
        {unreadCount > 0 && <button className="btn-secondary" style={{ fontSize: '.82rem', padding: '8px 16px' }} onClick={handleMarkAllRead} id="mark-all-read-btn">✓ Mark all read</button>}
      </div>

      {/* Filters */}
      <div className="glass-card" style={{ padding: 14, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
          {FILTERS.map(opt => (
            <button key={opt.value} id={`filter-${opt.value || 'all'}-btn`}
              style={{ padding: '6px 12px', borderRadius: 99, fontSize: '.75rem', fontWeight: 600, cursor: 'pointer', border: '1px solid', fontFamily: 'Inter,sans-serif', transition: 'all .2s',
                ...(filter === opt.value ? { background: 'rgba(20,184,166,.2)', borderColor: 'rgba(20,184,166,.4)', color: '#2dd4bf' } : { background: 'rgba(30,41,59,.6)', borderColor: '#334155', color: '#94a3b8' }) }}
              onClick={() => setFilter(opt.value)}>{opt.label}</button>
          ))}
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.82rem', color: '#94a3b8', cursor: 'pointer' }}>
          <input type="checkbox" id="unread-only-toggle" checked={showUnreadOnly} onChange={e => setShowUnreadOnly(e.target.checked)} style={{ accentColor: '#14b8a6' }} /> Unread only
        </label>
      </div>

      {/* Alert cards */}
      {filtered.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '48px 0', color: '#64748b' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>🔔</div>
          <div style={{ fontWeight: 500 }}>No alerts</div>
          <div style={{ fontSize: '.85rem', marginTop: 4 }}>You're all caught up!</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(alert => {
            const tc = TYPE_CONFIG[alert.type] || TYPE_CONFIG['30_DAY'];
            return (
              <div key={alert.id} id={`alert-${alert.id}`}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 18px', borderRadius: 12,
                  background: tc.bg, border: `1px solid ${tc.border}`, opacity: alert.read ? 0.55 : 1, transition: 'opacity .2s' }}>
                <div style={{ marginTop: 4, flexShrink: 0 }}>
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: alert.read ? '#334155' : tc.color }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: '.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: `${tc.color}20`, color: tc.color, border: `1px solid ${tc.color}40` }}>{tc.label}</span>
                    <span style={{ fontSize: '.72rem', color: '#475569' }}>{timeAgo(alert.createdAt)}</span>
                  </div>
                  <p style={{ fontSize: '.875rem', fontWeight: 500, color: '#e2e8f0', lineHeight: 1.45 }}>{alert.message}</p>
                  {alert.moleculeId && <Link to={`/molecules/${alert.moleculeId}`} style={{ fontSize: '.78rem', color: '#14b8a6', textDecoration: 'none', display: 'inline-block', marginTop: 4 }} id={`alert-mol-link-${alert.id}`}>View molecule →</Link>}
                </div>
                {!alert.read && <button className="btn-secondary" style={{ fontSize: '.75rem', padding: '5px 10px', flexShrink: 0 }} onClick={() => handleMarkRead(alert.id)} id={`mark-read-${alert.id}-btn`}>Mark read</button>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
