import React, { useState } from 'react';
import axios from 'axios';

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '', role: 'client' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/login' : '/register';
    try {
      const { data } = await axios.post(`http://localhost:5000/api${endpoint}`, form);
      if (isLogin) onLogin(data); // Pass token to App.js
      else alert('Registered! Please log in.');
    } catch (err) {
      alert('Error with authentication');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <input placeholder="Username" onChange={e => setForm({...form, username: e.target.value})} required />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} required />
      
      {!isLogin && (
        <select onChange={e => setForm({...form, role: e.target.value})}>
          <option value="client">Client</option>
          <option value="dietitian">Dietitian</option>
        </select>
      )}
      
      <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      <button type="button" onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? 'Register' : 'Login'}
      </button>
    </form>
  );
}