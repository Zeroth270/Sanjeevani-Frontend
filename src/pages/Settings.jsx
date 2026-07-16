import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const { user, login } = useAuth();
  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '' });
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  function saveProfile(e) {
    e.preventDefault();
    login(localStorage.getItem('sanjeevani_token'), { ...user, ...profile });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  }

  function savePassword(e) {
    e.preventDefault();
    setPasswordError('');
    if (passwords.next !== passwords.confirm) { setPasswordError('Passwords do not match.'); return; }
    if (passwords.next.length < 8) { setPasswordError('Must be at least 8 characters.'); return; }
    setPasswordSaved(true);
    setPasswords({ current: '', next: '', confirm: '' });
    setTimeout(() => setPasswordSaved(false), 3000);
  }

  const labelStyle = { display: 'block', fontSize: '.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: 7 };
  const successStyle = { padding: '10px 14px', borderRadius: 8, fontSize: '.85rem', background: 'rgba(20,184,166,.12)', color: '#2dd4bf', border: '1px solid rgba(20,184,166,.3)' };
  const errorStyle = { padding: '10px 14px', borderRadius: 8, fontSize: '.85rem', background: 'rgba(239,68,68,.12)', color: '#f87171', border: '1px solid rgba(239,68,68,.25)' };

  return (
    <div className="animate-fade-in" style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>Settings</h1>
        <p style={{ fontSize: '.85rem', color: '#64748b' }}>Manage your profile and account security</p>
      </div>

      {/* Avatar card */}
      <div className="glass-card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, display: 'grid', placeItems: 'center', fontSize: '1.5rem', fontWeight: 800, background: 'linear-gradient(135deg,#0d9488,#2dd4bf)', color: '#0f172a', flexShrink: 0 }}>
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </div>
        <div>
          <div style={{ fontWeight: 600, color: '#f1f5f9', fontSize: '1.05rem' }}>{user?.name}</div>
          <div style={{ fontSize: '.82rem', color: '#64748b', marginTop: 2 }}>{user?.email}</div>
          <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '.7rem', fontWeight: 700, padding: '3px 9px', borderRadius: 99, background: 'rgba(20,184,166,.15)', color: '#2dd4bf', border: '1px solid rgba(20,184,166,.3)' }}>
              {user?.role?.replace(/_/g, ' ') || 'RESEARCHER'}
            </span>
            {user?.institution && <span style={{ fontSize: '.75rem', color: '#64748b' }}>{user.institution}</span>}
          </div>
        </div>
      </div>

      {/* Profile form */}
      <form onSubmit={saveProfile} className="glass-card" id="profile-form" style={{ padding: '20px 24px' }}>
        <div style={{ fontSize: '.88rem', fontWeight: 700, color: '#f1f5f9', paddingBottom: 12, marginBottom: 16, borderBottom: '1px solid #1e293b' }}>Profile Information</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div><label style={labelStyle}>Full Name</label><input id="settings-name" type="text" required className="input-base" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} /></div>
          <div><label style={labelStyle}>Email</label><input id="settings-email" type="email" required className="input-base" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} /></div>
          {profileSaved && <div style={successStyle}>✓ Profile updated successfully</div>}
          <button type="submit" className="btn-primary" id="save-profile-btn" style={{ alignSelf: 'flex-start' }}>Save Profile</button>
        </div>
      </form>

      {/* Password form */}
      <form onSubmit={savePassword} className="glass-card" id="password-form" style={{ padding: '20px 24px' }}>
        <div style={{ fontSize: '.88rem', fontWeight: 700, color: '#f1f5f9', paddingBottom: 12, marginBottom: 16, borderBottom: '1px solid #1e293b' }}>Change Password</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {passwordError && <div style={errorStyle}>{passwordError}</div>}
          <div><label style={labelStyle}>Current Password</label><input id="settings-current-pass" type="password" required className="input-base" value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} /></div>
          <div><label style={labelStyle}>New Password</label><input id="settings-new-pass" type="password" required minLength={8} className="input-base" value={passwords.next} onChange={e => setPasswords(p => ({ ...p, next: e.target.value }))} /></div>
          <div><label style={labelStyle}>Confirm New Password</label><input id="settings-confirm-pass" type="password" required className="input-base" value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} /></div>
          {passwordSaved && <div style={successStyle}>✓ Password updated successfully</div>}
          <button type="submit" className="btn-primary" id="save-password-btn" style={{ alignSelf: 'flex-start' }}>Update Password</button>
        </div>
      </form>
    </div>
  );
}
