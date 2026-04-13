import { useState } from 'react';
import './CompactLandingPage.css';

export default function CompactLandingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="compact-landing">
      <header className="cl-header">
        <div className="container cl-header-inner">
          <div className="cl-brand">
            <svg viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
              <circle cx="32" cy="32" r="30" fill="#0ea5e9"/>
              <path d="M32 12 C32 12 20 28 20 38 C20 44.627 25.373 50 32 50 C38.627 50 44 44.627 44 38 C44 28 32 12 32 12Z" fill="white" opacity="0.9"/>
            </svg>
            <span><strong>PureFlow</strong> Pressure Washing</span>
          </div>
          <a href="tel:+16155559274" className="cl-phone">(615) 555-WASH</a>
        </div>
      </header>

      <main className="cl-main">
        <div className="container cl-main-inner">
          <div className="cl-grid">

            {/* Left: Value Prop */}
            <div className="cl-left">
              <div className="badge badge-blue">Professional Exterior Cleaning</div>
              <h1>
                Sparkling Clean<br />
                <span className="cl-accent">Surfaces, Instantly.</span>
              </h1>
              <p className="cl-subtitle">
                Eco-friendly, pro-grade pressure washing. Driveways, siding, and decks — no chemicals, no runoff.
              </p>
              <a href="/book" className="btn btn-primary btn-lg cl-cta-btn">
                Get a Free Quote
              </a>
              <div className="cl-trust">
                <span>Eco-Friendly</span>
                <span>Fully Insured</span>
                <span>5-Star Rated</span>
              </div>
            </div>

            {/* Right: Form + Photo */}
            <div className="cl-right">
              <div className="cl-form-card">
                {isSubmitted ? (
                  <div className="cl-success">
                    <span className="cl-check">✓</span>
                    <h3>Quote Request Sent!</h3>
                    <p>We'll call within 24 hours.</p>
                    <button onClick={() => setIsSubmitted(false)} className="cl-link-btn">Send another</button>
                  </div>
                ) : (
                  <>
                    <h3>Get a Free Instant Quote</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input type="text" required className="form-input" placeholder="Jane Smith" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input type="tel" required className="form-input" placeholder="(555) 123-4567" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Service Type</label>
                        <select className="form-select">
                          <option>Driveway Cleaning</option>
                          <option>House Soft Wash</option>
                          <option>Roof Cleaning</option>
                          <option>Deck & Fence</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-accent btn-lg cl-submit-btn">
                        Get My Quote
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Bottom strip with owner photo */}
      <div className="cl-bottom-strip">
        <div className="container cl-strip-inner">
          <img src="/images/owner.png" alt="Owner pressure washing" className="cl-strip-photo" />
          <div className="cl-strip-text">
            <span className="cl-strip-name">Your neighbor, not a corporation.</span>
            <span className="cl-strip-detail">I do every job personally — no subcontractors. Mount Juliet local.</span>
          </div>
          <a href="/book" className="btn btn-white">Book With Me — $99</a>
        </div>
      </div>
    </div>
  );
}
