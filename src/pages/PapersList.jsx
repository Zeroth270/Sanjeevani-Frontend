import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { papersApi } from '../lib/api';
import { mockPapers } from '../lib/mockData';
import { statusBadgeClass, formatDate } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

const STATUS_OPTIONS = ['', 'PROCESSED', 'PROCESSING', 'FAILED'];

export default function PapersList() {
  const { isAdmin } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['papers', { search, statusFilter, page }],
    queryFn: async () => {
      try { return (await papersApi.list({ status: statusFilter || undefined, page, size: 10, title: search || undefined })).data; }
      catch {
        let content = mockPapers.content;
        if (statusFilter) content = content.filter(p => p.status === statusFilter);
        if (search) content = content.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
        return { ...mockPapers, content };
      }
    },
    keepPreviousData: true,
    staleTime: 15_000,
  });

  const papers = data?.content || [];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>Papers</h1>
          <p style={{ fontSize: '.85rem', color: '#64748b' }}>{data?.totalElements ?? papers.length} papers in your institution</p>
        </div>
        <Link to="/papers/upload" className="btn-primary" id="papers-upload-btn" style={{ flexShrink: 0 }}>⬆ Upload Paper</Link>
      </div>

      {/* Filters */}
      <div className="glass-card" style={{ padding: 16, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <input id="papers-search" type="search" className="input-base" placeholder="Search by title…"
          style={{ maxWidth: 280 }} value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} />
        <select id="papers-status-filter" className="input-base" style={{ width: 170 }} value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setPage(0); }}>
          <option value="">All statuses</option>
          {STATUS_OPTIONS.filter(Boolean).map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}><div className="spinner" style={{ width: 28, height: 28 }} /></div>
        ) : papers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#64748b' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>📄</div>
            <div style={{ fontWeight: 500 }}>No papers found</div>
            <div style={{ fontSize: '.85rem', marginTop: 4 }}>Upload your first research paper to get started</div>
          </div>
        ) : (
          <table className="data-table">
            <thead><tr><th>Title</th><th>Authors</th><th>Date</th><th>Status</th><th>Molecules</th><th></th></tr></thead>
            <tbody>
              {papers.map(paper => (
                <tr key={paper.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '.875rem', lineHeight: 1.4, maxWidth: 280 }}>{paper.title}</div>
                    {isAdmin && paper.institution && <div style={{ fontSize: '.72rem', color: '#475569', marginTop: 2 }}>{paper.institution}</div>}
                  </td>
                  <td><span style={{ fontSize: '.85rem', color: '#94a3b8' }}>{paper.authors}</span></td>
                  <td><span style={{ fontSize: '.85rem', color: '#94a3b8' }}>{formatDate(paper.publicationDate)}</span></td>
                  <td><span className={`badge ${statusBadgeClass(paper.status)}`}>{paper.status}</span></td>
                  <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.85rem', color: paper.moleculeCount > 0 ? '#2dd4bf' : '#475569' }}>{paper.moleculeCount ?? '—'}</span></td>
                  <td><Link to={`/papers/${paper.id}`} style={{ fontSize: '.82rem', fontWeight: 600, color: '#14b8a6', textDecoration: 'none' }} id={`paper-link-${paper.id}`}>View →</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '.85rem', color: '#64748b' }}>Page {(data.number || 0) + 1} of {data.totalPages}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-secondary" disabled={page === 0} onClick={() => setPage(p => p - 1)} id="papers-prev-btn" style={{ padding: '8px 16px', fontSize: '.85rem' }}>← Prev</button>
            <button className="btn-secondary" disabled={page >= data.totalPages - 1} onClick={() => setPage(p => p + 1)} id="papers-next-btn" style={{ padding: '8px 16px', fontSize: '.85rem' }}>Next →</button>
          </div>
        </div>
      )}
    </div>
  );
}
