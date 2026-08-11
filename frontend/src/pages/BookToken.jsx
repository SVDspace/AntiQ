function BookToken() {
  return (
    <section className="book-token-page">
      <div className="book-wrapper">
        <div className="token-form-card">
          <h2>Book Your Token</h2>
          <p className="form-sub">Reserve your spot in advance and avoid on-site waiting.</p>
          <form>
            <div className="grid-2">
              <div className="field">
                <label>Full Name</label>
                <input type="text" placeholder="Enter full name" required />
              </div>
              <div className="field">
                <label>Mobile Number</label>
                <input type="tel" placeholder="Enter number" required />
              </div>
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" placeholder="Optional" />
            </div>
            <div className="field">
              <label>Select Location</label>
              <select required>
                <option value="">Choose location</option>
                <option>Central Complex</option>
                <option>North Center</option>
                <option>Main Branch</option>
              </select>
            </div>
            <div className="field">
              <label>Facility / Department</label>
              <select required>
                <option value="">Select facility</option>
                <option>Hospital Wing</option>
                <option>Office Counter</option>
                <option>Service Desk</option>
              </select>
              <small className="hint">Where exactly you need to visit</small>
            </div>
            <div className="field">
              <label>Service Type</label>
              <select required>
                <option value="">Select service</option>
                <option>Consultation</option>
                <option>Verification</option>
                <option>Submission</option>
                <option>Support</option>
              </select>
            </div>
            <div className="grid-2">
              <div className="field">
                <label>Date</label>
                <input type="date" required />
              </div>
              <div className="field">
                <label>Time Slot</label>
                <select required>
                  <option>09:00 – 10:00</option>
                  <option>10:00 – 11:00</option>
                  <option>11:00 – 12:00</option>
                  <option>12:00 – 01:00</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label>Additional Notes</label>
              <textarea rows="3" placeholder="Optional"></textarea>
            </div>
            <button type="submit" className="btn-primary-token token-submit">
              Confirm Booking
            </button>
          </form>
        </div>

        <div className="token-info-card">
          <h3>How Booking Works</h3>
          <ul>
            <li>Select your location</li>
            <li>Choose department</li>
            <li>Pick service type</li>
            <li>Select date & slot</li>
            <li>Get your token instantly</li>
          </ul>
          <div className="info-box">Token priority is based on booking time and slot availability.</div>
        </div>
      </div>
    </section>
  );
}

export default BookToken;
