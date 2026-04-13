import { useState } from 'react';
import { BEFORE_AFTER } from '../data/neighborhoods';
import './BeforeAfterGallery.css';

export default function BeforeAfterGallery({ limit, showHeader = true }) {
  const [activeId, setActiveId] = useState(null);
  const items = limit ? BEFORE_AFTER.slice(0, limit) : BEFORE_AFTER;

  return (
    <section className="section" id="gallery">
      <div className="container">
        {showHeader && (
          <div className="section-header">
            <div className="badge badge-blue">Real Results</div>
            <h2>Before &amp; After Transformations</h2>
            <p>Every driveway cleaned with 100% water — zero chemicals. See the difference pure pressure makes.</p>
          </div>
        )}

        <div className="gallery-grid">
          {items.map((item) => (
            <div
              key={item.id}
              className={`gallery-card card ${activeId === item.id ? 'flipped' : ''}`}
              onClick={() => setActiveId(activeId === item.id ? null : item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setActiveId(activeId === item.id ? null : item.id)}
            >
              <div className="gallery-images">
                <div className="gallery-before">
                  <img
                    src={item.beforeImg}
                    alt={`${item.title} before pressure washing`}
                    className="gallery-img"
                    loading="lazy"
                  />
                  <span className="gallery-label before">Before</span>
                </div>
                <div className="gallery-after">
                  <img
                    src={item.afterImg}
                    alt={`${item.title} after pressure washing`}
                    className="gallery-img"
                    loading="lazy"
                  />
                  <span className="gallery-label after">After</span>
                </div>
                <div className="gallery-slider-hint">
                  <span>Tap to compare</span>
                </div>
              </div>
              <div className="gallery-info">
                <h3>{item.title}</h3>
                <p className="gallery-location">{item.location}</p>
                <p className="gallery-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
