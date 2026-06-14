import { useState } from 'react';
import api from '../services/api';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/auth/register', form);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="card p-4">
      <h2>Register</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3" placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <input className="form-control mb-3" placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input className="form-control mb-3" placeholder="Password" type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button className="btn btn-primary">Create Account</button>
      </form>
    </div>
  );
}

export default Register;
