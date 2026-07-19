import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard({ user }) {
  const [mealPlans, setMealPlans] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPlan, setNewPlan] = useState({ title: '', calories: '', clientId: '', meals: { breakfast: '', lunch: '', dinner: '' }, macros: { protein: '', carbs: '', fat: '' } });

  const fetchMealPlans = async () => {
    try {
      const { data } = await axios.get('/api/mealplans', { headers: { Authorization: `Bearer ${user.token}` } });
      setMealPlans(data);
    } catch (err) { console.error(err); }
  };

  const fetchUsers = async () => {
    if (user.role === 'dietitian' || user.role === 'admin') {
      try {
        const { data } = await axios.get('/api/users', { headers: { Authorization: `Bearer ${user.token}` } });
        setUsers(data);
      } catch (err) { console.error(err); }
    }
  };

  useEffect(() => {
    Promise.all([fetchMealPlans(), fetchUsers()]).then(() => setLoading(false));
  }, [user]);

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/mealplans', newPlan, { headers: { Authorization: `Bearer ${user.token}` } });
      setNewPlan({ title: '', calories: '', clientId: '', meals: { breakfast: '', lunch: '', dinner: '' }, macros: { protein: '', carbs: '', fat: '' } });
      fetchMealPlans();
    } catch (err) { console.error(err); }
  };

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
      
      {/* Chart Section */}
      <div className="glass-card" style={{ gridColumn: '1 / -1' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Nutrition Overview</h3>
        {mealPlans.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No meal plans available.</p>
        ) : (
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer>
              <BarChart data={mealPlans}>
                <XAxis dataKey="title" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }} />
                <Bar dataKey="calories" fill="var(--primary)" name="Calories" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Dietitian/Admin Controls */}
      {(user.role === 'dietitian' || user.role === 'admin') && (
        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Create Meal Plan</h3>
          <form onSubmit={handleCreatePlan}>
            <input className="form-control-premium" placeholder="Plan Title" required value={newPlan.title} onChange={e => setNewPlan({...newPlan, title: e.target.value})} />
            <select className="form-control-premium" required value={newPlan.clientId} onChange={e => setNewPlan({...newPlan, clientId: e.target.value})}>
              <option value="" disabled>Select Client</option>
              {users.map(u => <option key={u._id} value={u._id}>{u.username}</option>)}
            </select>
            <input className="form-control-premium" type="number" placeholder="Total Calories" required value={newPlan.calories} onChange={e => setNewPlan({...newPlan, calories: e.target.value})} />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
              <input className="form-control-premium" type="number" placeholder="Protein (g)" value={newPlan.macros.protein} onChange={e => setNewPlan({...newPlan, macros: {...newPlan.macros, protein: e.target.value}})} />
              <input className="form-control-premium" type="number" placeholder="Carbs (g)" value={newPlan.macros.carbs} onChange={e => setNewPlan({...newPlan, macros: {...newPlan.macros, carbs: e.target.value}})} />
              <input className="form-control-premium" type="number" placeholder="Fat (g)" value={newPlan.macros.fat} onChange={e => setNewPlan({...newPlan, macros: {...newPlan.macros, fat: e.target.value}})} />
            </div>

            <textarea className="form-control-premium" placeholder="Breakfast" required value={newPlan.meals.breakfast} onChange={e => setNewPlan({...newPlan, meals: {...newPlan.meals, breakfast: e.target.value}})} />
            <textarea className="form-control-premium" placeholder="Lunch" required value={newPlan.meals.lunch} onChange={e => setNewPlan({...newPlan, meals: {...newPlan.meals, lunch: e.target.value}})} />
            <textarea className="form-control-premium" placeholder="Dinner" required value={newPlan.meals.dinner} onChange={e => setNewPlan({...newPlan, meals: {...newPlan.meals, dinner: e.target.value}})} />
            <button className="btn-premium" type="submit" style={{ width: '100%' }}>Create Plan</button>
          </form>
        </div>
      )}

      {/* Meal Plans List */}
      <div className="glass-card" style={{ gridColumn: (user.role === 'client') ? '1 / -1' : 'auto' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Recent Meal Plans</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {mealPlans.map(plan => (
            <div key={plan._id} style={{ padding: '1rem', background: 'var(--surface-hover)', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ margin: 0, color: 'var(--secondary)' }}>{plan.title}</h4>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{plan.calories} kcal</span>
              </div>
              <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                {user.role !== 'client' && <span>Client: {plan.clientId?.username}</span>}
                {user.role === 'client' && <span>Dietitian: {plan.dietitianId?.username}</span>}
              </div>
              <div style={{ fontSize: '0.85rem' }}>
                <strong>Breakfast:</strong> {plan.meals?.breakfast}<br/>
                <strong>Lunch:</strong> {plan.meals?.lunch}<br/>
                <strong>Dinner:</strong> {plan.meals?.dinner}
              </div>
              {plan.macros && (
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>P: {plan.macros.protein}g</span>
                  <span>C: {plan.macros.carbs}g</span>
                  <span>F: {plan.macros.fat}g</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
