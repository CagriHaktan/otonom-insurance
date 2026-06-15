import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.post('/auth/register', form);
      setMessage('Registration successful. You can now login.');
      setTimeout(() => navigate('/login'), 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="form-card">
      <h2 className="section-title mb-2">Customer Registration</h2>
      <p className="text-muted mb-4">
        Create a customer account to request offers and follow policy progress.
      </p>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <label className="form-label">Full Name</label>
        <input className="form-control mb-3" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} required />

        <label className="form-label">Email</label>
        <input className="form-control mb-3" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} required />

        <label className="form-label">Password</label>
        <input type="password" className="form-control mb-4" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} required />

        <button className="primary-btn w-100">Register</button>
      </form>
    </div>
  );
}

export default Register;
