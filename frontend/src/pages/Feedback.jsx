function Feedback() {
  return (
    <section className="fb-wrapper">
      <div className="fb-card">
        <h1 className="fb-title">We Value Your Feedback</h1>
        <p className="fb-subtitle">Help us improve your AntiQ queue experience</p>
        <form className="fb-form">
          <label className="fb-label">⭐ How was your overall experience?</label>
          <div className="fb-rating">
            {[5, 4, 3, 2, 1].map((value) => (
              <label key={value}>
                <input type="radio" name="rating" /> {value}
              </label>
            ))}
          </div>

          <label className="fb-label">🧭 What did you use AntiQ for?</label>
          <select className="fb-input" id="facility">
            <option value="" disabled hidden>
              Select facility
            </option>
            <option value="hospital">Hospital Visit</option>
            <option value="bank">Bank Visit</option>
            <option value="salon">Salon / Service Center</option>
            <option value="college">College / Office</option>
            <option value="other">Other</option>
          </select>

          <label className="fb-label">⏱️ Did AntiQ reduce your waiting time?</label>
          <div className="fb-options">
            <label>
              <input type="radio" name="wait" /> Yes
            </label>
            <label>
              <input type="radio" name="wait" /> No
            </label>
            <label>
              <input type="radio" name="wait" /> Not Sure
            </label>
          </div>

          <label className="fb-label">🔔 Were notifications helpful?</label>
          <div className="fb-options">
            <label>
              <input type="radio" name="notify" /> Very Helpful
            </label>
            <label>
              <input type="radio" name="notify" /> Somewhat
            </label>
            <label>
              <input type="radio" name="notify" /> Not Helpful
            </label>
          </div>

          <label className="fb-label">🐞 Did you face any problems?</label>
          <textarea className="fb-input fb-textarea" placeholder="Describe any issues you faced..."></textarea>

          <label className="fb-label">💡 Any suggestions to improve AntiQ?</label>
          <textarea className="fb-input fb-textarea" placeholder="Share your ideas..."></textarea>

          <label className="fb-label">😊 Would you recommend AntiQ to others?</label>
          <div className="fb-options">
            <label>
              <input type="radio" name="recommend" /> Yes
            </label>
            <label>
              <input type="radio" name="recommend" /> Maybe
            </label>
            <label>
              <input type="radio" name="recommend" /> No
            </label>
          </div>

          <label className="fb-label">📧 Email (optional)</label>
          <input type="email" className="fb-input" placeholder="Enter your email if you'd like a response" />

          <p className="fb-privacy">🔒 Your feedback is used only to improve AntiQ and will not be shared.</p>
          <button type="submit" className="fb-btn">
            Submit Feedback
          </button>
        </form>
      </div>
    </section>
  );
}

export default Feedback;
