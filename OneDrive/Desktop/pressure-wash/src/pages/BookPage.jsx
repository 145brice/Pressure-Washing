import BookingCalendar from '../components/BookingCalendar';
import './BookPage.css';

export default function BookPage() {
  return (
    <div className="book-page">
      <div className="book-hero">
        <div className="container">
          <div className="badge badge-green">Home of the $99 Driveway Wash</div>
          <h1>Book Your Driveway Cleaning</h1>
          <p>$99 covers any standard double-car driveway (400–600 sq ft). Got a larger driveway? <a href="#quote">Request a free quote</a>. Sidewalk or porch add-ons +$50 each.</p>
        </div>
      </div>
      <div className="container book-content">
        <BookingCalendar />
      </div>
    </div>
  );
}
