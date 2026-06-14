import { useState } from 'react';
import api from '../services/api';

function RequestForm() {
  const [form, setForm] = useState({
    customerName: '',
    email: '',
    insuranceType: 'Traffic Insurance',
    description: ''
  });

  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/requests', form);
      setMessage(response.data.message);
      setForm({
        customerName: '',
        email: '',
        insuranceType: 'Traffic Insurance',
        description: ''
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Request submission failed.');
    }
  };

  return (
    <div className="card p-4">
      <h2>Insurance Quote Request</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3" placeholder="Full Name" value={form.customerName}
          onChange={(e) => setForm({ ...form, customerName: e.target.value })} />

        <input className="form-control mb-3" placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <select className="form-control mb-3" value={form.insuranceType}
          onChange={(e) => setForm({ ...form, insuranceType: e.target.value })}>
          <option>Traffic Insurance</option>
          <option>Health Insurance</option>
          <option>Home Insurance</option>
          <option>Travel Insurance</option>
          <option>Vehicle Insurance</option>
        </select>

        <textarea className="form-control mb-3" placeholder="Description" value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>

        <button className="btn btn-success">Submit Request</button>
      </form>
    </div>
  );
}

export default RequestForm;
