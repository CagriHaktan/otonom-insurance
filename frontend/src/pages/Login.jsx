import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/auth/login', form);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      if (response.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/customer');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="form-card">
      <h2 className="section-title mb-2">Login</h2>
      <p className="text-muted mb-4">
        Please sign in with your account credentials.
      </p>

      {message && <div className="alert alert-danger">{message}</div>}

      <form onSubmit={handleSubmit}>
        <label className="form-label">Email</label>
        <input className="form-control mb-3" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} required />

        <label className="form-label">Password</label>
        <input type="password" className="form-control mb-4" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} required />

        <button className="primary-btn w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
