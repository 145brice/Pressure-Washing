import { useState } from 'react';
import { NEIGHBORHOODS } from '../data/neighborhoods';
import './QuoteForm.css';

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', neighborhood: '', address: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="section-dark" id="quote">
        <div className="container">
          <div className="quote-success">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <path d="M22 4 12 14.01l-3-3"/>
            </svg>
            <h2>Quote Request Sent!</h2>
            <p>Thanks, {formData.name}! We'll get back to you within 24 hours with a free quote. Most driveways are our flat $99 rate!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-dark" id="quote">
      <div className="container">
        <div className="quote-layout">
          <div className="quote-info">
            <div className="badge badge-green">Free Quote</div>
            <h2>Get Your Free Quote</h2>
            <p>Most driveways are our flat $99 rate. Larger job or special situation? Fill out the form and I'll get back to you — usually same day.</p>
          </div>

          <form className="quote-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label form-label-light">Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Smith"
                />
              </div>
              <div className="form-group">
                <label className="form-label form-label-light">Phone *</label>
                <input
                  type="tel"
                  className="form-input"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(615) 555-1234"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label form-label-light">Email *</label>
              <input
                type="email"
                className="form-input"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@email.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label form-label-light">Neighborhood</label>
              <select
                className="form-select"
                value={formData.neighborhood}
                onChange={e => setFormData({ ...formData, neighborhood: e.target.value })}
              >
                <option value="">Select your area...</option>
                {NEIGHBORHOODS.map(n => (
                  <option key={n.id} value={n.id}>{n.name} ({n.day}s)</option>
                ))}
                <option value="other">Other / Not Listed</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label form-label-light">Address</label>
              <input
                type="text"
                className="form-input"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                placeholder="123 Main St, Mount Juliet, TN"
              />
            </div>

            <div className="form-group">
              <label className="form-label form-label-light">Message</label>
              <textarea
                className="form-textarea"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your driveway — size, stains, special requests..."
                rows={4}
              />
            </div>

            <button type="submit" className="btn btn-accent btn-lg quote-submit">
              Get My Free Quote
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
