import { useState } from 'react';
import { NEIGHBORHOODS } from '../data/neighborhoods';
import './SocialPage.css';

const POST_TEMPLATES = {
  facebook: [
    {
      title: 'Before & After Reveal',
      template: `🏠 BEFORE & AFTER — [NEIGHBORHOOD] Driveway Transformation! 🏠

This [DAY] we brought another driveway back to life in [NEIGHBORHOOD]. 💧

✅ Water-only cleaning
✅ No chemicals touching your lawn
✅ Electric powered — no fumes
✅ Just $99 flat rate

Your neighbors are already booking! Ready for YOUR driveway to look brand new?

📱 Book at pureflowwash.com — [NEIGHBORHOOD] driveways every [DAY]!

#MountJuliet #PressureWashing #EcoFriendly #DrivewayCleaning #[HASHTAG] #WaterOnly #CurbAppeal`,
    },
    {
      title: 'Neighborhood Day Promo',
      template: `📅 It's [DAY] — that means we're in [NEIGHBORHOOD]! 📅

Slots filling up FAST for today. $99 gets your entire driveway looking brand new.

🌿 100% water-only (safe for kids, pets & gardens)
⚡ Electric equipment (no gas fumes)
💰 $99 flat rate (no hidden fees)

Comment "CLEAN" or DM us to grab one of the last spots today! 🙌

#[HASHTAG] #PressureWashing #DrivewayCleaning #EcoFriendly #WaterOnlyCleaning`,
    },
    {
      title: 'Social Proof / Testimonial',
      template: `⭐⭐⭐⭐⭐ Another happy customer in [NEIGHBORHOOD]!

"[TESTIMONIAL_TEXT]" — [CUSTOMER_NAME], [NEIGHBORHOOD]

We let our work speak for itself. Water-only pressure washing that transforms your driveway for just $99.

🗓️ [NEIGHBORHOOD] service day: [DAY]
🔗 Book: pureflowwash.com

#[HASHTAG] #PressureWashing #5Stars #EcoFriendly #CustomerLove`,
    },
    {
      title: 'Weekend Recap',
      template: `💧 Another incredible week of transformations! 💧

This week we cleaned driveways in:
📍 Mount Juliet (Monday)
📍 Lebanon (Tuesday)
📍 Hendersonville (Wednesday)
📍 Hermitage (Thursday)
📍 Gallatin (Friday)
📍 Old Hickory (Saturday)

Every single one — WATER ONLY. No chemicals. No exceptions.

Next week's slots are opening up! $99 flat rate.
📱 pureflowwash.com

#MiddleTennessee #PressureWashing #EcoFriendly #WeekInReview #WaterOnly`,
    },
  ],
  tiktok: [
    {
      title: 'Satisfying Clean',
      template: `The most satisfying driveway clean you'll see today 🤤💧

[NEIGHBORHOOD], TN — pure water, zero chemicals

$99 flat rate | Book: link in bio

#pressurewashing #satisfying #drivewaycleaning #beforeandafter #[HASHTAG_LOWER] #ecofriendly #wateronly #oddlysatisfying #cleaningtiktok #powerwashing`,
    },
    {
      title: 'Day-in-the-Life',
      template: `A day of pressure washing in [NEIGHBORHOOD], TN 🏠💧

Every [DAY] we roll through [NEIGHBORHOOD] with nothing but water and electric power. No chemicals. No gas fumes. Just clean driveways for $99.

Drop your city if you want us there next! 👇

#pressurewashing #dayinthelife #smallbusiness #[HASHTAG_LOWER] #tennessee #ecofriendly #cleaningtiktok #satisfying`,
    },
    {
      title: 'POV Transformation',
      template: `POV: Your neighbor just got their driveway cleaned for $99 and now you need it done too 😅

Water-only ✅
No chemicals ✅
Electric powered ✅
$99 flat rate ✅

[NEIGHBORHOOD] every [DAY] | Link in bio

#pressurewashing #povmeme #[HASHTAG_LOWER] #drivewayglow #beforeafter #cleaningtok #satisfyingclean`,
    },
  ],
};

export default function SocialPage() {
  const [platform, setPlatform] = useState('facebook');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(NEIGHBORHOODS[0]);
  const [customerName, setCustomerName] = useState('Sarah M.');
  const [testimonialText, setTestimonialText] = useState("Best $99 I've ever spent! My driveway looks brand new.");
  const [copiedIdx, setCopiedIdx] = useState(null);

  const fillTemplate = (template) => {
    const hashtag = selectedNeighborhood.name.replace(/\s+/g, '');
    return template
      .replace(/\[NEIGHBORHOOD\]/g, selectedNeighborhood.name)
      .replace(/\[DAY\]/g, selectedNeighborhood.day)
      .replace(/\[HASHTAG\]/g, hashtag)
      .replace(/\[HASHTAG_LOWER\]/g, hashtag.toLowerCase())
      .replace(/\[CUSTOMER_NAME\]/g, customerName)
      .replace(/\[TESTIMONIAL_TEXT\]/g, testimonialText);
  };

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const templates = POST_TEMPLATES[platform];

  return (
    <div className="social-page">
      <div className="social-hero">
        <div className="container">
          <div className="badge badge-blue">Content Creator</div>
          <h1>Social Media Post Helper</h1>
          <p>Generate ready-to-post content for Facebook groups and TikTok. Just customize, copy, and post!</p>
        </div>
      </div>

      <div className="container social-content">
        <div className="social-controls">
          <div className="control-group">
            <label className="form-label">Platform</label>
            <div className="platform-toggle">
              <button
                className={`platform-btn ${platform === 'facebook' ? 'active' : ''}`}
                onClick={() => setPlatform('facebook')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </button>
              <button
                className={`platform-btn ${platform === 'tiktok' ? 'active' : ''}`}
                onClick={() => setPlatform('tiktok')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                TikTok
              </button>
            </div>
          </div>

          <div className="control-group">
            <label className="form-label">Neighborhood</label>
            <select
              className="form-select"
              value={selectedNeighborhood.id}
              onChange={e => setSelectedNeighborhood(NEIGHBORHOODS.find(n => n.id === e.target.value))}
            >
              {NEIGHBORHOODS.map(n => (
                <option key={n.id} value={n.id}>{n.name} ({n.day})</option>
              ))}
            </select>
          </div>

          {platform === 'facebook' && (
            <div className="control-row">
              <div className="control-group">
                <label className="form-label">Customer Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                />
              </div>
              <div className="control-group">
                <label className="form-label">Testimonial</label>
                <input
                  type="text"
                  className="form-input"
                  value={testimonialText}
                  onChange={e => setTestimonialText(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="templates-grid">
          {templates.map((t, idx) => {
            const filled = fillTemplate(t.template);
            return (
              <div key={idx} className="template-card card">
                <div className="template-header">
                  <h3>{t.title}</h3>
                  <button
                    className={`copy-btn ${copiedIdx === idx ? 'copied' : ''}`}
                    onClick={() => copyToClipboard(filled, idx)}
                  >
                    {copiedIdx === idx ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="template-content">{filled}</pre>
              </div>
            );
          })}
        </div>

        <div className="social-tips">
          <h3>Posting Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <strong>Facebook Groups</strong>
              <ul>
                <li>Post before/after photos with every text post</li>
                <li>Join local neighborhood groups for each service area</li>
                <li>Post your daily transformation around 5-6 PM when engagement peaks</li>
                <li>Respond to every comment within 30 minutes</li>
              </ul>
            </div>
            <div className="tip-card">
              <strong>TikTok Strategy</strong>
              <ul>
                <li>Film the satisfying spray in slow-mo for max views</li>
                <li>Post 1-2x daily, morning and evening</li>
                <li>Use trending audio for the transformation reveal</li>
                <li>Always end with a clear CTA: "$99 — link in bio"</li>
              </ul>
            </div>
            <div className="tip-card">
              <strong>Photo Tips</strong>
              <ul>
                <li>Take before photos from the EXACT same angle as after</li>
                <li>Shoot in similar lighting conditions</li>
                <li>Include the house number or street for local credibility</li>
                <li>Wet the clean side slightly for maximum contrast</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
