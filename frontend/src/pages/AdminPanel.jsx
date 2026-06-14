import { useEffect, useState } from 'react';
import api from '../services/api';

function AdminPanel() {
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    const response = await api.get('/requests');
    setRequests(response.data);
  };

  const updateStatus = async (id, status) => {
    await api.put(`/requests/${id}`, { status });
    loadRequests();
  };

  const deleteRequest = async (id) => {
    await api.delete(`/requests/${id}`);
    loadRequests();
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <div className="card p-4">
      <h2>Admin Panel</h2>

      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Insurance Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.customerName}</td>
              <td>{request.email}</td>
              <td>{request.insuranceType}</td>
              <td><span className="status-badge">{request.status}</span></td>
              <td>
                <button className="btn btn-sm btn-success me-2"
                  onClick={() => updateStatus(request.id, 'Approved')}>
                  Approve
                </button>

                <button className="btn btn-sm btn-warning me-2"
                  onClick={() => updateStatus(request.id, 'Rejected')}>
                  Reject
                </button>

                <button className="btn btn-sm btn-danger"
                  onClick={() => deleteRequest(request.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
