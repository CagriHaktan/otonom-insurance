import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function AdminPanel() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);

  const loadData = async () => {
    const requestResponse = await api.get('/requests');
    const userResponse = await api.get('/auth/users');

    setRequests(requestResponse.data);
    setUsers(userResponse.data);
  };

  const updateRequest = async (id, payload) => {
    await api.put(`/requests/${id}`, payload);
    loadData();
  };

  const createPolicy = async (request) => {
    await updateRequest(request.id, {
      status: 'Approved',
      policyStatus: 'Policy Created'
    });

    setTimeout(() => {
      navigate(`/policy/${request.id}`);
    }, 300);
  };

  const deleteRequest = async (id) => {
    await api.delete(`/requests/${id}`);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  const total = requests.length;
  const customers = users.filter((user) => user.role === 'customer').length;
  const policies = requests.filter((r) => r.policyStatus === 'Policy Created').length;
  const waiting = requests.filter((r) => r.policyStatus !== 'Policy Created').length;
  const approved = requests.filter((r) => r.status === 'Approved' || r.status === 'Quote Accepted').length;
  const rejected = requests.filter((r) => r.status === 'Rejected').length;
  const pending = requests.filter((r) => r.status === 'Pending').length;

  const maxChartValue = Math.max(approved, rejected, pending, policies, 1);

  const badgeClass = (status) => {
    if (status === 'Approved' || status === 'Quote Accepted') return 'status-badge status-approved';
    if (status === 'Rejected') return 'status-badge status-rejected';
    if (status === 'Quote Prepared') return 'status-badge status-prepared';
    return 'status-badge status-pending';
  };

  const chartRows = [
    ['Approved / Accepted', approved],
    ['Rejected', rejected],
    ['Pending', pending],
    ['Policies Created', policies]
  ];

  return (
    <div>
      <h2 className="section-title mb-2">Admin Dashboard</h2>
      <p className="text-muted mb-4">
        Manage registered customers, quotation offers, policy creation and visual statistics.
      </p>

      <div className="row g-4 mb-4">
        <div className="col-md-3"><div className="dashboard-card"><p className="text-muted mb-1">Total Offers</p><h3>{total}</h3></div></div>
        <div className="col-md-3"><div className="dashboard-card"><p className="text-muted mb-1">Registered Customers</p><h3>{customers}</h3></div></div>
        <div className="col-md-3"><div className="dashboard-card"><p className="text-muted mb-1">Policies Created</p><h3>{policies}</h3></div></div>
        <div className="col-md-3"><div className="dashboard-card"><p className="text-muted mb-1">Waiting Process</p><h3>{waiting}</h3></div></div>
      </div>

      <div className="dashboard-card mb-4">
        <h4 className="mb-3">Visual Statistics</h4>

        <div className="chart-box">
          {chartRows.map(([label, value]) => (
            <div className="chart-row" key={label}>
              <div className="chart-label">{label}</div>
              <div className="chart-track">
                <div className="chart-bar" style={{ width: `${(value / maxChartValue) * 100}%` }}></div>
              </div>
              <div className="chart-value">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-card mb-4">
        <h4 className="mb-3">Quotation and Policy Management</h4>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Contact</th>
                <th>Insurance</th>
                <th>Offer Status</th>
                <th>Policy</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>#{request.id}</td>
                  <td>
                    <strong>{request.customerName}</strong><br/>
                    <span className="text-muted">{request.vehiclePlate || 'No reference'}</span>
                  </td>
                  <td>
                    {request.email}<br/>
                    <span className="text-muted">{request.phone || '-'}</span>
                  </td>
                  <td>{request.insuranceType}</td>
                  <td><span className={badgeClass(request.status)}>{request.status}</span></td>
                  <td><span className="policy-chip">{request.policyStatus}</span></td>
                  <td>{request.price.toLocaleString('tr-TR')} TL</td>
                  <td>
                    <button className="btn btn-sm btn-success me-2 mb-2"
                      onClick={() => createPolicy(request)}>
                      Create Policy
                    </button>

                    {request.policyStatus === 'Policy Created' && (
                      <button className="btn btn-sm btn-primary me-2 mb-2"
                        onClick={() => navigate(`/policy/${request.id}`)}>
                        View Policy
                      </button>
                    )}

                    <button className="btn btn-sm btn-warning me-2 mb-2"
                      onClick={() => updateRequest(request.id, {
                        status: 'Rejected',
                        policyStatus: 'Cancelled'
                      })}>
                      Reject
                    </button>

                    <button className="btn btn-sm btn-danger mb-2"
                      onClick={() => deleteRequest(request.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {requests.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center text-muted py-4">
                    No quotation requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-card">
        <h4 className="mb-3">Registered Users</h4>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Register Date</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>#{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className="policy-chip">{user.role}</span></td>
                  <td>{user.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
