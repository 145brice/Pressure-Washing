import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <svg viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
                <circle cx="32" cy="32" r="30" fill="#0ea5e9"/>
                <path d="M32 12 C32 12 20 28 20 38 C20 44.627 25.373 50 32 50 C38.627 50 44 44.627 44 38 C44 28 32 12 32 12Z" fill="white" opacity="0.9"/>
              </svg>
              <span>PureFlow</span>
            </div>
            <p>Eco-friendly, water-only pressure washing for driveways in Mount Juliet, TN and surrounding neighborhoods. No chemicals. No runoff. Just results.</p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/book">Book Now</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/social">Social Hub</Link>
          </div>

          <div className="footer-col">
            <h4>Service Areas</h4>
            <span>Mount Juliet — Monday</span>
            <span>Lebanon — Tuesday</span>
            <span>Hendersonville — Wednesday</span>
            <span>Hermitage — Thursday</span>
            <span>Gallatin — Friday</span>
            <span>Old Hickory — Saturday</span>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <a href="tel:+16155559274">(615) 555-WASH</a>
            <a href="mailto:hello@pureflowwash.com">hello@pureflowwash.com</a>
            <p className="footer-hours">Mon–Sat: 7 AM – 6 PM</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} PureFlow Pressure Washing. All rights reserved.</p>
          <p className="footer-tagline">Water-only. Electric-powered. Eco-friendly.</p>
        </div>
      </div>
    </footer>
  );
}
