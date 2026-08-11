import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content animate-fade">
          <span className="hero-badge">AntiQ • Queues made smarter</span>
          <h1 className="hero-subtitle">Lines? We've got it covered.</h1>
          <p className="hero-text">
            AntiQ simplifies service access with smart token management, helping people avoid long waits while organizations stay in control.
          </p>
          <div className="hero-actions">
            <Link to="/login" className="btn btn-primary">
              Get Started
            </Link>
            <a href="#how-it-works" className="btn btn-outline">
              How It Works
            </a>
          </div>
        </div>
      </section>

      <section className="section about">
        <h2 className="section-title animate-up">About AntiQ</h2>
        <p className="section-text animate-up">
          AntiQ is a modern access management platform designed to replace physical waiting lines with a transparent, digital token system. By optimizing how services are accessed, AntiQ improves efficiency, reduces congestion, and creates a calmer experience for everyone involved.
        </p>
      </section>

      <section className="section designed-for">
        <h2 className="section-title animate-up">Designed For</h2>
        <div className="pill-group animate-up">
          <span className="pill">Hospitals & Clinics</span>
          <span className="pill">Educational Institutes</span>
          <span className="pill">Service Centers</span>
          <span className="pill">Banks & Offices</span>
        </div>
      </section>

      <section id="how-it-works" className="section how">
        <h2 className="section-title animate-up">How It Works</h2>
        <div className="card-grid">
          <div className="how-card animate-up">
            <h3>Book a Token</h3>
            <p>Visitors request a token digitally and receive live updates.</p>
          </div>
          <div className="how-card animate-up">
            <h3>Manage Flow</h3>
            <p>Admins control service flow in real time.</p>
          </div>
          <div className="how-card animate-up">
            <h3>Arrive on Time</h3>
            <p>Arrive only when your turn is near.</p>
          </div>
        </div>
      </section>

      <section className="section built">
        <h2 className="section-title animate-up">Built for Everyone</h2>
        <div className="split-grid">
          <div className="split-card animate-up">
            <h3>For Visitors</h3>
            <p>Clear updates, no confusion, less waiting.</p>
          </div>
          <div className="split-card animate-up delay-1">
            <h3>For Administrators</h3>
            <p>Better control, analytics, and smoother operations.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2 className="animate-up">Ready to Remove Waiting?</h2>
          <p className="animate-up delay-1">Start using AntiQ and modernize how services are accessed.</p>
          <Link to="/login" className="btn btn-primary animate-up delay-2">
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
