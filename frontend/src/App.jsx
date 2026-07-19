import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    if (token && role && id) {
      setUser({ token, role, id, username });
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('role', userData.role);
    localStorage.setItem('userId', userData.id);
    localStorage.setItem('username', userData.username);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  if (loading) return <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;

  return (
    <Router>
      <div className="app-container">
        <nav className="premium-nav">
          <h1 className="text-gradient" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
            Nutrition Assistant
          </h1>
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Hello, {user.username} ({user.role})</span>
              <button onClick={handleLogout} className="btn-secondary-premium" style={{ padding: '0.5rem 1rem' }}>
                Logout
              </button>
            </div>
          )}
        </nav>
        
        <main style={{ padding: '2rem', flex: 1 }}>
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Auth onLogin={handleLogin} />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
