import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <section className="hero-card">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <h1 className="hero-title">Insurance Offer and Policy Management</h1>
            <p className="hero-text">
              Choose an insurance type, enter customer information, calculate a demo offer price and continue to policy creation.
            </p>

            <div className="mt-4">
              <Link to="/insurance-types" className="primary-btn me-3">Choose Insurance Type</Link>
              <Link to="/quote" className="outline-btn">Quick Offer</Link>
            </div>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <div className="row g-3">
              <div className="col-6"><div className="stat-card"><div className="stat-number">1</div><div>Choose Type</div></div></div>
              <div className="col-6"><div className="stat-card"><div className="stat-number">2</div><div>Get Offer</div></div></div>
              <div className="col-6"><div className="stat-card"><div className="stat-number">3</div><div>Accept Offer</div></div></div>
              <div className="col-6"><div className="stat-card"><div className="stat-number">4</div><div>Create Policy</div></div></div>
            </div>
          </div>
        </div>
      </section>

      <div className="ai-widget">
        <strong>AI Assistant</strong><br/>
        Ask about quotation and policy process.
      </div>
    </>
  );
}

export default Home;
