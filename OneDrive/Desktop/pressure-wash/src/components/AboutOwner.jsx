import { Link } from 'react-router-dom';
import './AboutOwner.css';

export default function AboutOwner() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-layout">
          <div className="about-photo-wrapper">
            <img
              src="/images/owner.png"
              alt="Owner of PureFlow Pressure Washing"
              className="about-photo"
              loading="lazy"
            />
            <div className="about-photo-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Mount Juliet Local
            </div>
          </div>

          <div className="about-text">
            <div className="badge badge-blue">Meet the Owner</div>
            <h2>Your Neighbor, Not a Corporation</h2>
            <p>
              I live right here in Mount Juliet and do every job personally — no subcontractors.
              I started PureFlow because pure water at high pressure cleans just as well as chemicals,
              and it's safe for your family, pets, and yard. When you book with me, you're getting me.
            </p>

            <div className="about-stats">
              <div className="about-stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Water Only</span>
              </div>
              <div className="about-stat">
                <span className="stat-number">$99</span>
                <span className="stat-label">Flat Rate</span>
              </div>
              <div className="about-stat">
                <span className="stat-number">0</span>
                <span className="stat-label">Chemicals Used</span>
              </div>
            </div>

            <Link to="/book" className="btn btn-primary btn-lg">
              Book With Me — $99
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
