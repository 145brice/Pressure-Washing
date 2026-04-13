import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="badge badge-green hero-badge">
          <span className="badge-dot" />
          Mount Juliet · Hermitage · Old Hickory
        </div>

        <h1>
          Home of the <span className="text-gradient">$99 Driveway Wash</span>
        </h1>

        <p className="hero-subtitle">
          Water-only. Electric-powered. No chemicals, no runoff.
          Your standard double-car driveway (400–600 sq ft) cleaned in 90 minutes flat.
        </p>

        <div className="hero-price">
          <div className="price-tag">
            <span className="dollar">$</span>
            <span className="amount">99</span>
          </div>
          <div className="price-details">
            <strong>Flat rate — double-car driveway</strong>
            <span>400–600 sq ft · Larger? Free quote · Add-ons +$50</span>
          </div>
        </div>

        <div className="hero-actions">
          <Link to="/book" className="btn btn-accent btn-lg">
            Book My Driveway — $99
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <a href="#quote" className="btn btn-outline btn-lg">
            Get a Free Quote
          </a>
        </div>

        <div className="hero-trust">
          <div className="trust-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg>
            <span>100% Water Only</span>
          </div>
          <div className="trust-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg>
            <span>Electric Equipment</span>
          </div>
          <div className="trust-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg>
            <span>Local Owner-Operated</span>
          </div>
        </div>
      </div>
    </section>
  );
}
