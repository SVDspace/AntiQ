function About() {
  return (
    <main className="about-main">
      <div className="container">
        <section className="intro">
          <h1 className="animate-fade">About AntiQ</h1>
          <p className="animate-up">
            AntiQ is a modern digital token management platform designed to transform how people access services. Traditional queues often lead to long waits, overcrowding, and unnecessary frustration for both customers and staff. AntiQ eliminates these problems by allowing users to book tokens online, track their turn in real time, and arrive exactly when their service is ready.
          </p>
        </section>

        <section className="how-it-works" id="working">
          <h2 className="animate-fade">How It Works? (For Client)</h2>
          <div className="steps-grid">
            <div className="step-card animate-up">
              <div className="step-number">1</div>
              <h3>Book a Token</h3>
              <p>Choose a service location and reserve your token online within seconds.</p>
            </div>
            <div className="step-card animate-up">
              <div className="step-number">2</div>
              <h3>Track Your Turn</h3>
              <p>Receive real-time updates and monitor your turn without being physically present.</p>
            </div>
            <div className="step-card animate-up">
              <div className="step-number">3</div>
              <h3>Get Served on Time</h3>
              <p>Arrive when your turn is near and enjoy a smooth, hassle-free service experience.</p>
            </div>
          </div>
        </section>

        <section className="how-it-works">
          <h2 className="animate-fade">How It Works? (For Admin/Staff)</h2>
          <div className="steps-grid">
            <div className="step-card animate-up">
              <div className="step-number">1</div>
              <h3>Centralized Token Control</h3>
              <p>Create, manage, and regulate tokens from a single, intuitive dashboard.</p>
            </div>
            <div className="step-card animate-up">
              <div className="step-number">2</div>
              <h3>Real-Time Monitoring</h3>
              <p>View live token status, service progress, and active workload instantly.</p>
            </div>
            <div className="step-card animate-up">
              <div className="step-number">3</div>
              <h3>Smarter Service Management</h3>
              <p>Minimize crowding, balance workload, and deliver faster, more organized service.</p>
            </div>
          </div>
        </section>

        <section id="why-choose" className="why-service">
          <h2 className="animate-fade">Why Choose AntiQ?</h2>
          <div className="why-grid">
            <div className="why-card animate-up">
              <h3>Time, Put First</h3>
              <p>AntiQ is designed to respect time by enabling services to run smoothly without long or uncertain waiting.</p>
            </div>
            <div className="why-card animate-up">
              <h3>Clear, Real-Time Updates</h3>
              <p>Live status visibility keeps visitors informed and reduces confusion at every step.</p>
            </div>
            <div className="why-card animate-up">
              <h3>Calmer, More Organized Spaces</h3>
              <p>By replacing physical lines with digital tokens, AntiQ helps create orderly, crowd-free environments.</p>
            </div>
            <div className="why-card animate-up">
              <h3>Simple to Use, Easy to Manage</h3>
              <p>A clean experience for visitors combined with powerful tools for admins to manage service flow efficiently.</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <p className="cta-intro animate-up">Ready to take the next step? Start your journey with us today and experience the difference AntiQ can make.</p>
            <a href="/login" className="btn cta-btn">
              Get Started
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

export default About;
