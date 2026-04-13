import { TESTIMONIALS } from '../data/neighborhoods';
import './Testimonials.css';

export default function Testimonials() {
  return (
    <section className="section-alt" id="testimonials">
      <div className="container">
        <div className="section-header">
          <div className="badge badge-green">Customer Love</div>
          <h2>What Our Neighbors Say</h2>
          <p>Real reviews from real driveways across Middle Tennessee.</p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map(t => (
            <div key={t.id} className="testimonial-card card">
              <div className="testimonial-stars">
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i} className={i < t.rating ? 'star filled' : 'star'}>{s}</span>
                ))}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {t.name.charAt(0)}
                </div>
                <div className="testimonial-info">
                  <strong>{t.name}</strong>
                  <span>{t.location}</span>
                </div>
                <span className="testimonial-date">{t.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
