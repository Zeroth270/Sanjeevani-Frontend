import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { papersApi } from '../lib/api';
import { mockPaper } from '../lib/mockData';
import { statusBadgeClass, formatDate, truncateSMILES } from '../lib/utils';

export default function PaperDetail() {
  const { id } = useParams();
  const { data: paper, isLoading } = useQuery({
    queryKey: ['paper', id],
    queryFn: async () => { try { return (await papersApi.get(id)).data; } catch { return mockPaper; } },
  });

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }}><div className="spinner" style={{ width: 36, height: 36 }} /></div>;
  if (!paper) return <div style={{ textAlign: 'center', paddingTop: 80, color: '#64748b' }}>Paper not found.</div>;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '.82rem', color: '#64748b' }}>
        <Link to="/papers" style={{ color: '#14b8a6', textDecoration: 'none', fontWeight: 500 }}>Papers</Link>
        <span>/</span>
        <span style={{ color: '#e2e8f0', fontWeight: 500, maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{paper.title}</span>
      </div>

      {/* Header card */}
      <div className="glass-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 18 }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.4, marginBottom: 8 }}>{paper.title}</h1>
            <p style={{ fontSize: '.85rem', color: '#94a3b8' }}>{paper.authors}</p>
          </div>
          <span className={`badge ${statusBadgeClass(paper.status)}`} style={{ flexShrink: 0 }}>{paper.status}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, paddingTop: 16, borderTop: '1px solid #1e293b' }}>
          {[
            ['Institution', paper.institution],
            ['Published', formatDate(paper.publicationDate)],
            ['Source Type', paper.sourceType?.replace(/_/g, ' ')],
            ['Molecules Found', paper.extractedMolecules?.length ?? '—'],
          ].map(([label, val]) => (
            <div key={label}>
              <div style={{ fontSize: '.7rem', color: '#64748b', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: '.875rem', fontWeight: 600, color: '#f1f5f9' }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Processing banner */}
      {paper.status === 'PROCESSING' && (
        <div style={{ padding: '14px 20px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(251,191,36,.08)', border: '1px solid rgba(251,191,36,.25)' }}>
          <div className="spinner" style={{ width: 18, height: 18, borderTopColor: '#fbbf24' }} />
          <div>
            <div style={{ fontWeight: 600, color: '#fbbf24', fontSize: '.88rem' }}>Processing in progress</div>
            <div style={{ fontSize: '.8rem', color: '#94a3b8', marginTop: 2 }}>Our ML pipeline is extracting molecular structures. This usually takes 1–3 minutes.</div>
          </div>
        </div>
      )}

      {/* Extracted Molecules */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9' }}>⚗ Extracted Molecules</h2>
          <span style={{ fontSize: '.82rem', color: '#64748b' }}>({paper.extractedMolecules?.length || 0} found)</span>
        </div>

        {!paper.extractedMolecules?.length ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '48px 0', color: '#64748b' }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>⚗</div>
            <div>No molecules extracted yet</div>
          </div>
        ) : (
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <table className="data-table">
              <thead><tr><th>Molecule Name</th><th>SMILES String</th><th>Confidence</th><th>Novelty</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {paper.extractedMolecules.map(mol => (
                  <tr key={mol.id}>
                    <td><span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '.875rem' }}>{mol.name}</span></td>
                    <td><span className="chem-mono">{truncateSMILES(mol.smilesString, 30)}</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 56, height: 5, borderRadius: 99, background: '#1e293b', overflow: 'hidden' }}>
                          <div style={{ height: '100%', borderRadius: 99, width: `${Math.round(mol.extractionConfidence * 100)}%`,
                            background: mol.extractionConfidence > 0.85 ? '#14b8a6' : mol.extractionConfidence > 0.7 ? '#fbbf24' : '#f87171' }} />
                        </div>
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.78rem', color: '#94a3b8' }}>{Math.round(mol.extractionConfidence * 100)}%</span>
                      </div>
                    </td>
                    <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: '#2dd4bf' }}>{mol.noveltyScore !== undefined ? Math.round(mol.noveltyScore * 100) : '—'}</span></td>
                    <td><span className={`badge ${statusBadgeClass(mol.status)}`}>{mol.status}</span></td>
                    <td><Link to={`/molecules/${mol.id}`} style={{ fontSize: '.82rem', fontWeight: 600, color: '#14b8a6', textDecoration: 'none' }} id={`mol-link-${mol.id}`}>Report →</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
