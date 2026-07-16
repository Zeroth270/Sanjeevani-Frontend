import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('sanjeevani_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const login = useCallback((token, userData) => {
    localStorage.setItem('sanjeevani_token', token);
    localStorage.setItem('sanjeevani_user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('sanjeevani_token');
    localStorage.removeItem('sanjeevani_user');
    setUser(null);
  }, []);

  const isAdmin = user?.role === 'INSTITUTION_ADMIN' || user?.role === 'TTO_OFFICER';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
