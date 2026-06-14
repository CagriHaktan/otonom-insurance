import { useState } from 'react';
import api from '../services/api';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/auth/login', form);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setMessage(`Login successful. Welcome ${response.data.user.name}`);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="card p-4">
      <h2>Login</h2>

      <div className="alert alert-secondary">
        Admin: admin@otonom.com / 123456<br />
        Customer: customer@otonom.com / 123456
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3" placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input className="form-control mb-3" placeholder="Password" type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
