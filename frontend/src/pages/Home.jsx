function Home() {
  return (
    <div className="hero text-center">
      <h1>Otonom Insurance Management System</h1>
      <p className="lead mt-3">
        Submit insurance quotation requests online and manage them through a simple admin panel.
      </p>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Traffic Insurance</h5>
            <p>Request traffic insurance quotations.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Health Insurance</h5>
            <p>Submit health insurance requests.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Home Insurance</h5>
            <p>Manage home insurance applications.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
