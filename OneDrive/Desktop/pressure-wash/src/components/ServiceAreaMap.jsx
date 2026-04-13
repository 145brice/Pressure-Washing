import { NEIGHBORHOODS } from '../data/neighborhoods';
import './ServiceAreaMap.css';

export default function ServiceAreaMap() {
  return (
    <section className="section" id="service-areas">
      <div className="container">
        <div className="section-header">
          <div className="badge badge-blue">Service Areas</div>
          <h2>We Come to Your Neighborhood</h2>
          <p>Each area gets a dedicated day so we can serve your street efficiently. Find your neighborhood below.</p>
        </div>

        <div className="service-area-content">
          <div className="service-map-visual">
            <div className="map-placeholder">
              <svg viewBox="0 0 400 300" className="map-svg">
                {/* Simplified map of service area */}
                <rect width="400" height="300" fill="#eff6ff" rx="12"/>

                {/* Roads */}
                <line x1="0" y1="150" x2="400" y2="150" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="8,4"/>
                <line x1="200" y1="0" x2="200" y2="300" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="8,4"/>
                <line x1="50" y1="50" x2="350" y2="250" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6,4"/>
                <line x1="350" y1="50" x2="50" y2="250" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6,4"/>

                {/* City markers */}
                {NEIGHBORHOODS.map((n, i) => {
                  const positions = [
                    { x: 200, y: 140 }, // Mount Juliet (center)
                    { x: 310, y: 130 }, // Lebanon (east)
                    { x: 130, y: 60 },  // Hendersonville (north)
                    { x: 90, y: 155 },  // Hermitage (west)
                    { x: 240, y: 50 },  // Gallatin (northeast)
                    { x: 140, y: 200 }, // Old Hickory (southwest)
                  ];
                  const pos = positions[i];
                  return (
                    <g key={n.id}>
                      <circle cx={pos.x} cy={pos.y} r={i === 0 ? 18 : 12} fill={n.color} opacity="0.15"/>
                      <circle cx={pos.x} cy={pos.y} r={i === 0 ? 8 : 6} fill={n.color}/>
                      <text
                        x={pos.x}
                        y={pos.y + (i === 0 ? 30 : 22)}
                        textAnchor="middle"
                        fill={n.color}
                        fontSize={i === 0 ? "12" : "10"}
                        fontWeight="700"
                        fontFamily="Inter, sans-serif"
                      >
                        {n.name}
                      </text>
                    </g>
                  );
                })}

                {/* Connection lines from Mt Juliet to others */}
                {NEIGHBORHOODS.slice(1).map((n, i) => {
                  const center = { x: 200, y: 140 };
                  const positions = [
                    { x: 310, y: 130 },
                    { x: 130, y: 60 },
                    { x: 90, y: 155 },
                    { x: 240, y: 50 },
                    { x: 140, y: 200 },
                  ];
                  const pos = positions[i];
                  return (
                    <line
                      key={n.id}
                      x1={center.x} y1={center.y}
                      x2={pos.x} y2={pos.y}
                      stroke={n.color}
                      strokeWidth="1.5"
                      strokeDasharray="4,3"
                      opacity="0.4"
                    />
                  );
                })}
              </svg>
              <div className="map-label">Middle Tennessee Service Area</div>
            </div>
          </div>

          <div className="service-schedule">
            <h3>Weekly Schedule</h3>
            {NEIGHBORHOODS.map(n => (
              <div key={n.id} className="schedule-row">
                <div className="schedule-day" style={{ background: n.color }}>
                  {n.day.slice(0, 3)}
                </div>
                <div className="schedule-info">
                  <strong>{n.name}</strong>
                  <span>{n.areas.join(' · ')}</span>
                </div>
              </div>
            ))}
            <p className="schedule-note">
              Don't see your neighborhood? <a href="#quote">Request a free quote</a> — we're expanding!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
