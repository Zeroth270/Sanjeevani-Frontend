import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { authApi, institutionsApi } from '../lib/api';
import { mockInstitutions } from '../lib/mockData';

const roles = [
  { value: 'RESEARCHER', label: 'Researcher / Scientist' },
  { value: 'TTO_OFFICER', label: 'TTO Officer' },
  { value: 'INSTITUTION_ADMIN', label: 'Institution Admin' },
];

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', institutionId: '', role: 'RESEARCHER' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: institutions } = useQuery({
    queryKey: ['institutions'],
    queryFn: async () => { try { return (await institutionsApi.list()).data; } catch { return mockInstitutions; } },
    staleTime: 10 * 60 * 1000,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authApi.register(form);
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
      if (err.code === 'ERR_NETWORK' || err.response?.status === 404) {
        login('mock-jwt-token', { id: 'u-new', name: form.name, email: form.email, role: form.role, institution: form.institutionId });
        navigate('/dashboard');
      } else { setError(err.response?.data?.message || 'Registration failed.'); }
    } finally { setLoading(false); }
  }

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  return (
    <div className="hero-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: 440 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 42, height: 42, borderRadius: 11, background: 'linear-gradient(135deg,#0d9488,#14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#0f172a' }}>S</div>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f1f5f9' }}>Sanjeevani</span>
          </div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>Register your institution</h1>
          <p style={{ fontSize: '.85rem', color: '#64748b' }}>Start scanning molecules for patent urgency</p>
        </div>

        {/* Card */}
        <form onSubmit={handleSubmit} className="glass-card" id="register-form" style={{ padding: '28px 32px 24px' }}>
          {error && <div style={{ marginBottom: 16, padding: '10px 14px', borderRadius: 8, background: 'rgba(239,68,68,.1)', color: '#f87171', border: '1px solid rgba(239,68,68,.25)', fontSize: '.85rem' }}>{error}</div>}

          {[
            { id: 'reg-name', label: 'Full Name', type: 'text', field: 'name', ph: 'Dr. Ananya Sharma' },
            { id: 'reg-email', label: 'Institutional Email', type: 'email', field: 'email', ph: 'researcher@iitb.ac.in' },
            { id: 'reg-password', label: 'Password', type: 'password', field: 'password', ph: 'At least 8 characters', min: 8 },
          ].map(({ id, label, type, field, ph, min }) => (
            <div key={id} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: 7 }}>{label}</label>
              <input id={id} type={type} required className="input-base" placeholder={ph} minLength={min} value={form[field]} onChange={set(field)} />
            </div>
          ))}

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: 7 }}>Institution</label>
            <select id="reg-institution" required className="input-base" value={form.institutionId} onChange={set('institutionId')}>
              <option value="">Select institution…</option>
              {(institutions || mockInstitutions).map(inst => <option key={inst.id} value={inst.id}>{inst.name}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 22 }}>
            <label style={{ display: 'block', fontSize: '.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: 7 }}>Role</label>
            <select id="reg-role" className="input-base" value={form.role} onChange={set('role')}>
              {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>

          <button type="submit" className="btn-primary" id="register-submit-btn" disabled={loading} style={{ width: '100%', padding: '11px 20px', fontSize: '.925rem', marginBottom: 16 }}>
            {loading ? <><div className="spinner" style={{ width: 16, height: 16 }} /> Creating account…</> : 'Create Account →'}
          </button>

          <p style={{ textAlign: 'center', fontSize: '.85rem', color: '#64748b' }}>
            Already registered?{' '}<Link to="/login" id="go-login-link" style={{ color: '#14b8a6', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
