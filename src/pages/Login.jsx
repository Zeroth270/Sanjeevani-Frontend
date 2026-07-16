import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authApi } from '../lib/api';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authApi.login(form);
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
      if (err.code === 'ERR_NETWORK' || err.response?.status === 404) {
        const mockUser = {
          id: 'u1', name: form.email.split('@')[0],
          email: form.email, role: 'TTO_OFFICER', institution: 'IIT Bombay',
        };
        login('mock-jwt-token', mockUser);
        navigate('/dashboard');
      } else {
        setError(err.response?.data?.message || 'Invalid email or password.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="hero-bg" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: 420 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 11,
              background: 'linear-gradient(135deg,#0d9488,#14b8a6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 800, color: '#0f172a',
            }}>S</div>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f1f5f9' }}>Sanjeevani</span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>
            Welcome back
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Sign in to your TTO dashboard</p>
        </div>

        {/* Card */}
        <form onSubmit={handleSubmit} className="glass-card" id="login-form"
          style={{ padding: '32px 32px 28px' }}>

          {error && (
            <div style={{
              marginBottom: 20, padding: '12px 14px', borderRadius: 8,
              background: 'rgba(239,68,68,0.1)', color: '#f87171',
              border: '1px solid rgba(239,68,68,0.25)', fontSize: '0.85rem',
            }}>{error}</div>
          )}

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500,
              color: '#94a3b8', marginBottom: 7 }}>
              Institutional Email
            </label>
            <input id="login-email" type="email" required className="input-base"
              placeholder="researcher@iitb.ac.in"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500,
              color: '#94a3b8', marginBottom: 7 }}>
              Password
            </label>
            <input id="login-password" type="password" required className="input-base"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
          </div>

          <button type="submit" className="btn-primary" id="login-submit-btn"
            disabled={loading}
            style={{ width: '100%', padding: '11px 20px', fontSize: '0.925rem', marginBottom: 18 }}>
            {loading
              ? <><div className="spinner" style={{ width: 16, height: 16 }}></div> Signing in…</>
              : 'Sign In'}
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
            Don't have an account?{' '}
            <Link to="/register" id="go-register-link"
              style={{ color: '#14b8a6', fontWeight: 600, textDecoration: 'none' }}>
              Register your institution
            </Link>
          </p>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.72rem', color: '#334155', marginTop: 16 }}>
          Demo mode: any email/password works when backend is offline.
        </p>
      </div>
    </div>
  );
}
