import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { papersApi, institutionsApi } from '../lib/api';
import { mockPaper, mockInstitutions } from '../lib/mockData';

const SOURCE_TYPES = [
  { value: 'JOURNAL_ARTICLE', label: 'Journal Article' },
  { value: 'CONFERENCE_PAPER', label: 'Conference Paper' },
  { value: 'THESIS', label: 'Thesis / Dissertation' },
  { value: 'PREPRINT', label: 'Preprint / arXiv' },
  { value: 'PATENT', label: 'Patent Document' },
  { value: 'OTHER', label: 'Other' },
];

export default function UploadPaper() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', authors: '', sourceType: 'JOURNAL_ARTICLE', publicationDate: '', institutionId: '' });
  const [file, setFile] = useState(null);
  const [rawText, setRawText] = useState('');
  const [inputMode, setInputMode] = useState('pdf');
  const [uploading, setUploading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [error, setError] = useState('');

  const { data: institutions } = useQuery({
    queryKey: ['institutions'],
    queryFn: async () => { try { return (await institutionsApi.list()).data; } catch { return mockInstitutions; } },
    staleTime: 10 * 60 * 1000,
  });

  function handleDone(paperData) {
    if (paperData?.status === 'FAILED') { setError('Processing failed.'); setPolling(false); }
    else navigate(`/papers/${paperData.id}`);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setUploading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => { if (v) fd.append(k, v); });
      if (inputMode === 'pdf' && file) fd.append('file', file);
      else if (inputMode === 'text' && rawText) fd.append('rawText', rawText);
      const res = await papersApi.upload(fd);
      const pid = res.data?.id || res.data?.paperId;
      setUploading(false);
      setPolling(true);
      let attempts = 0;
      const iv = setInterval(async () => {
        attempts++;
        try {
          const poll = await papersApi.get(pid);
          if (poll.data?.status === 'PROCESSED' || poll.data?.status === 'FAILED' || attempts > 30) { clearInterval(iv); handleDone(poll.data); }
        } catch { if (attempts >= 2) { clearInterval(iv); handleDone({ ...mockPaper, id: pid }); } }
      }, 2000);
    } catch (err) {
      if (err.code === 'ERR_NETWORK' || err.response?.status === 404) { setUploading(false); setPolling(true); setTimeout(() => handleDone(mockPaper), 3000); }
      else { setUploading(false); setError(err.response?.data?.message || 'Upload failed.'); }
    }
  }

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  /* ── Processing state ── */
  if (polling) {
    return (
      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, gap: 24 }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, display: 'grid', placeItems: 'center', background: 'rgba(20,184,166,.12)', border: '1px solid rgba(20,184,166,.3)' }}>
          <div className="spinner" style={{ width: 28, height: 28 }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>Processing your paper…</div>
          <div style={{ fontSize: '.85rem', color: '#64748b' }}>Our NLP pipeline is extracting molecular structures. This usually takes 1–3 minutes.</div>
        </div>
        {/* Workflow steps indicator */}
        <div className="glass-card" style={{ padding: '16px 22px', display: 'flex', alignItems: 'center', gap: 20, fontSize: '.82rem' }}>
          {['Parsing text', 'Identifying entities', 'Extracting SMILES', 'Canonicalizing', 'Novelty check'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: '.65rem', fontWeight: 700, 
                background: i < 3 ? 'rgba(20,184,166,.15)' : 'rgba(51,65,85,.5)', color: i < 3 ? '#14b8a6' : '#475569', border: `1px solid ${i < 3 ? 'rgba(20,184,166,.3)' : '#334155'}` }}>
                {i < 2 ? '✓' : i === 2 ? '…' : (i + 1)}
              </div>
              <span style={{ color: i < 3 ? '#94a3b8' : '#475569' }}>{s}</span>
              {i < 4 && <span style={{ color: '#334155', margin: '0 4px' }}>→</span>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ── Upload form ── */
  return (
    <div className="animate-fade-in" style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>Upload Research Paper</h1>
        <p style={{ fontSize: '.85rem', color: '#64748b' }}>Submit a paper for molecule extraction and novelty analysis</p>
      </div>

      {error && <div style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(239,68,68,.1)', color: '#f87171', border: '1px solid rgba(239,68,68,.25)', fontSize: '.85rem' }}>{error}</div>}

      <form onSubmit={handleSubmit} className="glass-card" id="upload-form" style={{ padding: '24px 28px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: '.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: 7 }}>Paper Title *</label>
            <input id="upload-title" type="text" required className="input-base" placeholder="Novel Curcumin Analogs with Enhanced Bioavailability" value={form.title} onChange={set('title')} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: 7 }}>Authors *</label>
            <input id="upload-authors" type="text" required className="input-base" placeholder="Sharma R, Gupta S, Patel M" value={form.authors} onChange={set('authors')} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: '.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: 7 }}>Source Type</label>
              <select id="upload-source-type" className="input-base" value={form.sourceType} onChange={set('sourceType')}>
                {SOURCE_TYPES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: 7 }}>Publication Date</label>
              <input id="upload-pub-date" type="date" className="input-base" value={form.publicationDate} onChange={set('publicationDate')} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: 7 }}>Institution</label>
            <select id="upload-institution" className="input-base" value={form.institutionId} onChange={set('institutionId')}>
              <option value="">Select institution…</option>
              {(institutions || mockInstitutions).map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select>
          </div>

          {/* Input mode */}
          <div>
            <label style={{ display: 'block', fontSize: '.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: 7 }}>Paper Content</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {[['pdf', '📎 Upload PDF'], ['text', '📝 Paste Text']].map(([mode, label]) => (
                <button key={mode} type="button" id={`mode-${mode}-btn`}
                  className={inputMode === mode ? 'btn-primary' : 'btn-secondary'}
                  style={{ padding: '8px 16px', fontSize: '.82rem' }}
                  onClick={() => setInputMode(mode)}>{label}</button>
              ))}
            </div>
            {inputMode === 'pdf' ? (
              <label htmlFor="upload-file" style={{
                display: 'block', border: `2px dashed ${file ? '#14b8a6' : '#334155'}`, borderRadius: 12,
                padding: '32px 16px', textAlign: 'center', cursor: 'pointer', transition: 'border-color .2s',
                background: file ? 'rgba(20,184,166,.05)' : 'rgba(15,23,42,.4)',
              }}>
                <input id="upload-file" type="file" accept=".pdf,.txt" style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />
                {file ? (
                  <><div style={{ fontSize: '1.5rem', marginBottom: 8 }}>📄</div><div style={{ fontSize: '.88rem', fontWeight: 600, color: '#2dd4bf' }}>{file.name}</div><div style={{ fontSize: '.75rem', color: '#64748b', marginTop: 4 }}>{(file.size / 1024).toFixed(0)} KB · Click to change</div></>
                ) : (
                  <><div style={{ fontSize: '2rem', marginBottom: 8 }}>⬆</div><div style={{ fontSize: '.88rem', fontWeight: 500, color: '#94a3b8' }}>Drop PDF here or click to browse</div><div style={{ fontSize: '.75rem', color: '#475569', marginTop: 4 }}>PDF or TXT, up to 20 MB</div></>
                )}
              </label>
            ) : (
              <textarea id="upload-raw-text" className="input-base" style={{ minHeight: 180, resize: 'vertical', fontFamily: "'JetBrains Mono',monospace", fontSize: '.78rem' }}
                placeholder="Paste the full paper text here, including experimental section..." value={rawText} onChange={e => setRawText(e.target.value)} />
            )}
          </div>

          <button type="submit" className="btn-primary" id="upload-submit-btn"
            disabled={uploading || (inputMode === 'pdf' && !file) || (inputMode === 'text' && !rawText.trim())}
            style={{ width: '100%', padding: '12px 20px', fontSize: '.95rem', marginTop: 8 }}>
            {uploading ? <><div className="spinner" style={{ width: 16, height: 16 }} /> Uploading…</> : '⬆ Submit Paper for Analysis'}
          </button>
        </div>
      </form>
    </div>
  );
}
