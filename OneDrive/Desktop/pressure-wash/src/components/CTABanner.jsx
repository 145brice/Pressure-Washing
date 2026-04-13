import { Link } from 'react-router-dom';
import './CTABanner.css';

export default function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="container cta-inner">
        <div className="cta-text">
          <h2>Home of the $99 Driveway Wash</h2>
          <p>Water only. No chemicals. 90 minutes. Avg. double-car driveway (400–600 sq ft). Sidewalk or porch add-on +$50 each. Larger driveway? Free quote.</p>
        </div>
        <div className="cta-actions">
          <Link to="/book" className="btn btn-white btn-lg">
            Book Now — $99
          </Link>
          <a href="tel:+16155559274" className="btn btn-outline cta-phone btn-lg">
            (615) 555-WASH
          </a>
        </div>
      </div>
    </section>
  );
}
