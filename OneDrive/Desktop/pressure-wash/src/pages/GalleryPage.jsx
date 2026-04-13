import BeforeAfterGallery from '../components/BeforeAfterGallery';
import CTABanner from '../components/CTABanner';

export default function GalleryPage() {
  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #ecfeff 100%)', padding: '48px 0', textAlign: 'center' }}>
        <div className="container">
          <h1>Before &amp; After Gallery</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', maxWidth: 600, margin: '12px auto 0' }}>
            Real driveways. Real results. Every transformation achieved with nothing but water and pressure.
          </p>
        </div>
      </div>
      <BeforeAfterGallery showHeader={false} />
      <CTABanner />
    </>
  );
}
