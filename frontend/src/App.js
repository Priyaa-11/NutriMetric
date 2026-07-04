import React, { useState } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

export default function App() {
  const [user, setUser] = useState(null); // Stores token and role

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Nutrition Assistant</h1>
      {user ? (
        <Dashboard user={user} onLogout={() => setUser(null)} />
      ) : (
        <Auth onLogin={setUser} />
      )}
    </div>
  );
}