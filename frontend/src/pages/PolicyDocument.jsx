import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function PolicyDocument() {
  const { id } = useParams();
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    const loadPolicy = async () => {
      const response = await api.get('/requests');
      const selected = response.data.find((item) => String(item.id) === String(id));
      setPolicy(selected);
    };

    loadPolicy();
  }, [id]);

  if (!policy) {
    return <div className="dashboard-card">Policy not found.</div>;
  }

  const policyNo = `POL-2026-${String(policy.id).padStart(4, '0')}`;

  return (
    <div>
      <div className="policy-document">
        <div className="policy-header">
          <div>
            <h2>Otonom Insurance</h2>
            <p>Official Demo Policy Document</p>
          </div>

          <div className="policy-number">
            <strong>Policy No</strong>
            <span>{policyNo}</span>
          </div>
        </div>

        <hr />

        <div className="row mt-4">
          <div className="col-md-6">
            <h5>Customer Information</h5>
            <p><strong>Name:</strong> {policy.customerName}</p>
            <p><strong>Email:</strong> {policy.email}</p>
            <p><strong>Phone:</strong> {policy.phone || '-'}</p>
          </div>

          <div className="col-md-6">
            <h5>Insurance Information</h5>
            <p><strong>Insurance Type:</strong> {policy.insuranceType}</p>
            <p><strong>Vehicle / Reference:</strong> {policy.vehiclePlate || '-'}</p>
            <p><strong>Created Date:</strong> {policy.createdAt}</p>
          </div>
        </div>

        <div className="policy-summary mt-4">
          <div>
            <span>Status</span>
            <strong>{policy.policyStatus}</strong>
          </div>

          <div>
            <span>Premium Price</span>
            <strong>{policy.price.toLocaleString('tr-TR')} TL</strong>
          </div>

          <div>
            <span>Coverage Period</span>
            <strong>1 Year</strong>
          </div>
        </div>

        <div className="mt-4">
          <h5>Policy Description</h5>
          <p className="text-muted">
            This document represents a demo insurance policy created through the Otonom Insurance Management System. The policy was generated after the customer accepted the quotation and the admin completed the policy creation process.
          </p>
        </div>

        <div className="signature-row mt-5">
          <div>
            <strong>Customer Signature</strong>
            <div className="signature-line"></div>
          </div>

          <div>
            <strong>Agency Approval</strong>
            <div className="signature-line"></div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="primary-btn" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>
    </div>
  );
}

export default PolicyDocument;
