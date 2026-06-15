import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function QuoteRequest() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedType = searchParams.get('type') || 'Traffic Insurance';

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const [step, setStep] = useState(1);
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    customerName: user?.name || '',
    email: user?.email || '',
    phone: '',
    insuranceType: selectedType,
    vehiclePlate: '',
    description: ''
  });

  const calculateOffer = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/requests/calculate', {
        insuranceType: form.insuranceType
      });

      setPrice(response.data.price);
      setStep(2);
      setMessage('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Price calculation failed.');
    }
  };

  const acceptOffer = async () => {
    try {
      const response = await api.post('/requests', {
        ...form,
        price
      });

      setMessage(response.data.message);
      setStep(3);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Policy process failed.');
    }
  };

  return (
    <div className="form-card">
      <h2 className="section-title mb-2">Get Insurance Quote</h2>
      <p className="text-muted mb-4">
        Selected type: <strong>{form.insuranceType}</strong>
      </p>

      <div className="quote-steps mb-4">
        <div className={step >= 1 ? 'quote-step active-step' : 'quote-step'}>1. Customer Info</div>
        <div className={step >= 2 ? 'quote-step active-step' : 'quote-step'}>2. Offer Price</div>
        <div className={step >= 3 ? 'quote-step active-step' : 'quote-step'}>3. Policy Process</div>
      </div>

      {message && <div className="alert alert-success">{message}</div>}

      {step === 1 && (
        <form onSubmit={calculateOffer}>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input className="form-control mb-3" value={form.customerName}
                onChange={(e) => setForm({ ...form, customerName: e.target.value })} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input className="form-control mb-3" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input className="form-control mb-3" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>

            <div className="col-md-6">
              <label className="form-label">Insurance Type</label>
              <select className="form-select mb-3" value={form.insuranceType}
                onChange={(e) => setForm({ ...form, insuranceType: e.target.value })}>
                <option>Traffic Insurance</option>
                <option>Vehicle Insurance</option>
                <option>Health Insurance</option>
                <option>Home Insurance</option>
                <option>Travel Insurance</option>
                <option>Workplace Insurance</option>
              </select>
            </div>
          </div>

          {(form.insuranceType === 'Traffic Insurance' || form.insuranceType === 'Vehicle Insurance') && (
            <>
              <label className="form-label">Vehicle Plate</label>
              <input className="form-control mb-3" value={form.vehiclePlate}
                placeholder="Example: 34 ABC 365"
                onChange={(e) => setForm({ ...form, vehiclePlate: e.target.value })} />
            </>
          )}

          <label className="form-label">Additional Details</label>
          <textarea className="form-control mb-4" rows="4" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>

          <button className="primary-btn w-100">Continue and Calculate Offer</button>
        </form>
      )}

      {step === 2 && (
        <div className="offer-card text-center">
          <h4>Your Estimated Offer</h4>
          <div className="price-box">{price.toLocaleString('tr-TR')} TL</div>
          <p className="text-muted">
            This is a demo quotation price generated according to the selected insurance type.
          </p>

          <button className="primary-btn me-3" onClick={acceptOffer}>
            Accept Offer and Continue to Policy
          </button>

          <button className="outline-btn" onClick={() => setStep(1)}>
            Edit Information
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="offer-card text-center">
          <h4>Policy Process Started</h4>
          <p className="text-muted">
            Your accepted quotation has been sent to the admin panel for policy creation.
          </p>

          <button className="primary-btn" onClick={() => navigate('/customer')}>
            Go to My Panel
          </button>
        </div>
      )}
    </div>
  );
}

export default QuoteRequest;
