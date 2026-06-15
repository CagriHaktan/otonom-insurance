import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import QuoteRequest from './pages/QuoteRequest';
import CustomerPanel from './pages/CustomerPanel';
import AdminPanel from './pages/AdminPanel';
import InsuranceTypes from './pages/InsuranceTypes';
import PolicyDocument from './pages/PolicyDocument';

function Navigation() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar px-4">
      <Link className="navbar-brand brand-text" to="/">Otonom Insurance</Link>

      <div className="navbar-nav ms-auto align-items-center">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/insurance-types">Insurance Types</Link>
        <Link className="nav-link quote-link" to="/quote">Get Quote</Link>

        {user?.role === 'admin' && <Link className="nav-link" to="/admin">Admin Dashboard</Link>}
        {user?.role === 'customer' && <Link className="nav-link" to="/customer">My Panel</Link>}

        {!user && <Link className="nav-link" to="/register">Register</Link>}
        {!user && <Link className="nav-link" to="/login">Login</Link>}

        {user && <button className="logout-btn ms-3" onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insurance-types" element={<InsuranceTypes />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quote" element={<QuoteRequest />} />
          <Route path="/customer" element={<CustomerPanel />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/policy/:id" element={<PolicyDocument />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
