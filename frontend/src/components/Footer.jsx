import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-column column1">
          <h3 className="footer-logo">AntiQ</h3>
          <p>"A digital approach to <br /> efficient and transparent <br /> queue management."</p>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/book-token">Book Token</Link>
            </li>
            <li>
              <Link to="/check-status">Check Status</Link>
            </li>
            <li>
              <Link to="/login">Sign In / Sign Up</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Explore</h4>
          <ul>
            <li>
              <Link to="/faqs">FAQs</Link>
            </li>
            <li>
              <Link to="/about#why-choose">Why Choose AntiQ?</Link>
            </li>
            <li>
              <Link to="/about#working">How it works?</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Policies</h4>
          <ul>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-and-conditions">Terms and Conditions</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact & Support</h4>
          <p>Email: support@antiq.com</p>
          <p>Phone: +91-XXXXXXXXXX</p>
          <ul>
            <li>
              <Link to="/feedback">Feedback</Link>
            </li>
            <li>
              <Link to="/help-center">Help Center</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="social-links">
          <a href="#" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="#" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="#" aria-label="Phone">
            <i className="fa-solid fa-phone"></i>
          </a>
          <a href="#" aria-label="Email">
            <i className="fa-solid fa-envelope"></i>
          </a>
        </div>
        <p>© 2026 AntiQ. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
