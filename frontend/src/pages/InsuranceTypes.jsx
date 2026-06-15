import { useNavigate } from 'react-router-dom';

function InsuranceTypes() {
  const navigate = useNavigate();

  const types = [
    ['🚗', 'Traffic Insurance', 'Mandatory vehicle insurance for legal road usage.'],
    ['🚙', 'Vehicle Insurance', 'Protects your car against accident, theft and damage risks.'],
    ['🏥', 'Health Insurance', 'Covers medical expenses and private healthcare services.'],
    ['🏠', 'Home Insurance', 'Protects your house and belongings against unexpected risks.'],
    ['✈️', 'Travel Insurance', 'Provides protection during travel.'],
    ['🏢', 'Workplace Insurance', 'Protects business locations and operational risks.']
  ];

  const selectType = (type) => {
    navigate(`/quote?type=${encodeURIComponent(type)}`);
  };

  return (
    <div>
      <h2 className="section-title mb-2">Insurance Types</h2>
      <p className="text-muted mb-4">
        Select an insurance type to start the quotation process.
      </p>

      <div className="row g-4">
        {types.map(([icon, title, text]) => (
          <div className="col-md-4" key={title}>
            <div className="type-card clickable-card" onClick={() => selectType(title)}>
              <div className="type-icon">{icon}</div>
              <h5>{title}</h5>
              <p className="text-muted">{text}</p>
              <button className="small-action-btn mt-2">Get Quote</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InsuranceTypes;
