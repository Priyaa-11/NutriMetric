import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard({ user, onLogout }) {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({ title: '', calories: '' });

  const fetchPlans = async () => {
    const { data } = await axios.get('http://localhost:5000/api/mealplans');
    setPlans(data);
  };

  useEffect(() => { fetchPlans(); }, []);

  const addPlan = async () => {
    await axios.post('http://localhost:5000/api/mealplans', newPlan);
    fetchPlans();
  };

  return (
    <div>
      <header>
        <h3>Logged in as: {user.role}</h3>
        <button onClick={onLogout}>Logout</button>
      </header>

      {user.role === 'dietitian' && (
        <div style={{ margin: '20px 0', padding: '10px', border: '1px solid black' }}>
          <h4>Create Meal Plan</h4>
          <input placeholder="Plan Title" onChange={e => setNewPlan({...newPlan, title: e.target.value})} />
          <input placeholder="Calories" type="number" onChange={e => setNewPlan({...newPlan, calories: e.target.value})} />
          <button onClick={addPlan}>Add Plan</button>
        </div>
      )}

      <h4>All Meal Plans</h4>
      <ul>
        {plans.map((p, index) => (
          <li key={index}>{p.title} - {p.calories} kcal</li>
        ))}
      </ul>
    </div>
  );
}