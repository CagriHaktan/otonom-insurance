import { useEffect, useState } from 'react';
import api from '../services/api';

function CustomerPanel() {
  const [requests, setRequests] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const loadRequests = async () => {
    const response = await api.get('/requests');
    const filtered = response.data.filter((request) => request.email === user?.email);
    setRequests(filtered);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const badgeClass = (status) => {
    if (status === 'Approved' || status === 'Quote Accepted') return 'status-badge status-approved';
    if (status === 'Rejected') return 'status-badge status-rejected';
    if (status === 'Quote Prepared') return 'status-badge status-prepared';
    return 'status-badge status-pending';
  };

  return (
    <div>
      <h2 className="section-title mb-2">Customer Panel</h2>
      <p className="text-muted mb-4">
        Track your accepted offers and policy creation process.
      </p>

      <div className="dashboard-card">
        <h4 className="mb-3">My Offers and Policies</h4>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Insurance Type</th>
                <th>Offer Status</th>
                <th>Policy Status</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>#{request.id}</td>
                  <td>{request.insuranceType}</td>
                  <td><span className={badgeClass(request.status)}>{request.status}</span></td>
                  <td><span className="policy-chip">{request.policyStatus}</span></td>
                  <td>{request.price > 0 ? `${request.price.toLocaleString('tr-TR')} TL` : '-'}</td>
                  <td>{request.createdAt}</td>
                </tr>
              ))}

              {requests.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    No request found for this customer.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerPanel;
