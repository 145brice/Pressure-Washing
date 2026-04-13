import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/book', label: 'Book Now' },
    { to: '/social', label: 'Social Hub' },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <svg viewBox="0 0 64 64" width="36" height="36" aria-hidden="true">
            <circle cx="32" cy="32" r="30" fill="#0ea5e9"/>
            <path d="M32 12 C32 12 20 28 20 38 C20 44.627 25.373 50 32 50 C38.627 50 44 44.627 44 38 C44 28 32 12 32 12Z" fill="white" opacity="0.9"/>
          </svg>
          <span className="brand-text">
            <strong>PureFlow</strong>
            <small>Home of the $99 Driveway Wash</small>
          </span>
        </Link>

        <button
          className={`navbar-toggle ${open ? 'active' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span /><span /><span />
        </button>

        <div className={`navbar-links ${open ? 'open' : ''}`}>
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/book" className="btn btn-accent nav-cta" onClick={() => setOpen(false)}>
            $99 — Book Today
          </Link>
        </div>
      </div>
    </nav>
  );
}
