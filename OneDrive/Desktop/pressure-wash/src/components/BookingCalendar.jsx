import { useState, useMemo } from 'react';
import { NEIGHBORHOODS, getAvailableDates } from '../data/neighborhoods';
import './BookingCalendar.css';

// 90-min slots, 30-min gap = new slot every 2 hrs, 7am–5pm
function generateTimeSlots() {
  const slots = [];
  for (let h = 7; h <= 17; h += 2) {
    const endH = h + 1;
    const fmt = (hr) => `${hr > 12 ? hr - 12 : hr}:00 ${hr < 12 ? 'AM' : 'PM'}`;
    const fmtEnd = (hr) => `${hr > 12 ? hr - 12 : hr}:30 ${hr < 12 ? 'AM' : 'PM'}`;
    slots.push({ id: h, start: fmt(h), end: fmtEnd(endH), hour: h });
  }
  return slots;
}

const ALL_SLOTS = generateTimeSlots();

function getSlotsForDate(date) {
  const seed = date.getDate() + date.getMonth() * 31;
  return ALL_SLOTS.map(s => ({
    ...s,
    available: ((seed * 7 + s.hour * 13) % 10) > 2,
  }));
}

export default function BookingCalendar() {
  const [hood, setHood] = useState(NEIGHBORHOODS[0]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', notes: '', addSidewalk: false, addPorch: false });
  const [submitted, setSubmitted] = useState(false);

  const dates = useMemo(() => getAvailableDates(hood.id), [hood]);
  const slots = useMemo(() => selectedDate ? getSlotsForDate(selectedDate.date) : [], [selectedDate]);

  const fmtDate = d => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const fmtDateLong = d => d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const ready = selectedDate && selectedTime;
  const total = 99 + (form.addSidewalk ? 50 : 0) + (form.addPorch ? 50 : 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const reset = () => {
    setHood(NEIGHBORHOODS[0]);
    setSelectedDate(null);
    setSelectedTime(null);
    setForm({ name: '', phone: '', email: '', address: '', notes: '', addSidewalk: false, addPorch: false });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="booking-success">
        <div className="success-icon">✓</div>
        <h2>You're Booked!</h2>
        <p>See you {hood.day} at {selectedTime.start}.</p>
        <div className="success-details">
          <div className="detail-row"><span>Area</span><strong>{hood.name}</strong></div>
          <div className="detail-row"><span>Date</span><strong>{fmtDateLong(selectedDate.date)}</strong></div>
          <div className="detail-row"><span>Time</span><strong>{selectedTime.start} – {selectedTime.end} (90 min)</strong></div>
          {form.addSidewalk && <div className="detail-row"><span>Add-on</span><strong>Sidewalk (+$50)</strong></div>}
          {form.addPorch && <div className="detail-row"><span>Add-on</span><strong>Porch / Patio (+$50)</strong></div>}
          <div className="detail-row"><span>Total</span><strong>${total}.00</strong></div>
          <div className="detail-row"><span>Name</span><strong>{form.name}</strong></div>
        </div>
        <p className="success-note">Confirmation sent to <strong>{form.email}</strong></p>
        <button className="btn btn-primary" onClick={reset}>Book Another</button>
      </div>
    );
  }

  return (
    <div className="bc-wrap">

      {/* ── Area Tabs ── */}
      <div className="bc-section">
        <p className="bc-label">1. Pick your area</p>
        <div className="hood-tabs">
          {NEIGHBORHOODS.map(n => (
            <button
              key={n.id}
              className={`hood-tab ${hood.id === n.id ? 'active' : ''}`}
              style={{ '--tab-color': n.color }}
              onClick={() => { setHood(n); setSelectedDate(null); setSelectedTime(null); }}
            >
              <span className="hood-tab-name">{n.name}</span>
              <span className="hood-tab-day">{n.day}s</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Date Row ── */}
      <div className="bc-section">
        <p className="bc-label">2. Pick a date</p>
        <div className="date-row">
          {dates.slice(0, 8).map((d, i) => (
            <button
              key={i}
              className={`date-pill ${selectedDate === d ? 'active' : ''} ${d.slotsAvailable <= 2 ? 'low' : ''}`}
              onClick={() => { setSelectedDate(d); setSelectedTime(null); }}
            >
              <span className="dp-weekday">{d.date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
              <span className="dp-day">{d.date.getDate()}</span>
              <span className="dp-month">{d.date.toLocaleDateString('en-US', { month: 'short' })}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Time Slots ── */}
      {selectedDate && (
        <div className="bc-section">
          <p className="bc-label">3. Pick a time <span className="bc-sublabel">— 90 min each, 30 min between jobs</span></p>
          <div className="slot-row">
            {slots.map(s => (
              <button
                key={s.id}
                className={`slot-pill ${!s.available ? 'taken' : ''} ${selectedTime?.id === s.id ? 'active' : ''}`}
                disabled={!s.available}
                onClick={() => setSelectedTime(s)}
              >
                <span className="slot-time">{s.start}</span>
                <span className="slot-dash">→ {s.end}</span>
                {!s.available && <span className="slot-taken-tag">Taken</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Form ── */}
      {ready && (
        <div className="bc-section">
          <p className="bc-label">4. Your info</p>

          <div className="bc-summary">
            <span style={{ color: hood.color }}>●</span>
            <strong>{hood.name}</strong>
            <span className="bc-sum-sep">·</span>
            <span>{fmtDate(selectedDate.date)}</span>
            <span className="bc-sum-sep">·</span>
            <span>{selectedTime.start} – {selectedTime.end}</span>
            <span className="bc-sum-sep">·</span>
            <strong className="bc-sum-price">${total}</strong>
          </div>

          <form onSubmit={handleSubmit} className="bc-form">
            <div className="bc-form-row">
              <div className="form-group">
                <label className="form-label">Name *</label>
                <input className="form-input" type="text" required placeholder="John Smith"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone *</label>
                <input className="form-input" type="tel" required placeholder="(615) 555-1234"
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input className="form-input" type="email" required placeholder="you@email.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Driveway Address *</label>
              <input className="form-input" type="text" required placeholder="123 Main St, Mount Juliet, TN"
                value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Add-ons <span style={{fontWeight:400,color:'var(--gray-400)'}}>+$50 each</span></label>
              <div className="addon-row">
                <label className={`addon-card ${form.addSidewalk ? 'checked' : ''}`}>
                  <input type="checkbox" checked={form.addSidewalk}
                    onChange={e => setForm({ ...form, addSidewalk: e.target.checked })} />
                  <span className="addon-icon">🚶</span>
                  <span className="addon-name">Sidewalk</span>
                  <span className="addon-price">+$50</span>
                </label>
                <label className={`addon-card ${form.addPorch ? 'checked' : ''}`}>
                  <input type="checkbox" checked={form.addPorch}
                    onChange={e => setForm({ ...form, addPorch: e.target.checked })} />
                  <span className="addon-icon">🏡</span>
                  <span className="addon-name">Porch / Patio</span>
                  <span className="addon-price">+$50</span>
                </label>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Notes <span style={{fontWeight:400,color:'var(--gray-400)'}}>optional</span></label>
              <textarea className="form-textarea" rows={2} placeholder="Gate code, dogs in yard, etc."
                value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-accent btn-lg bc-submit">
              Confirm — ${total}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
