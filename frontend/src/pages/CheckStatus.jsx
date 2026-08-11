import { useState } from 'react';

const bookings = {
  AQ101: {
    name: 'Rahul',
    status: 'Waiting',
    position: 5,
    counter: 'Counter 2',
  },
  AQ102: {
    name: 'Amit',
    status: 'Processing',
    position: 0,
    counter: 'Counter 1',
  },
  AQ103: {
    name: 'Priya',
    status: 'Completed',
    position: 0,
    counter: 'Done',
  },
};

function CheckStatus() {
  const [bookingId, setBookingId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCheck = () => {
    const id = bookingId.trim().toUpperCase();
    setError('');

    if (!id) {
      setError('⚠ Please enter Booking ID');
      setResult(null);
      return;
    }

    const data = bookings[id];
    if (data) {
      setResult({ id, ...data });
      setError('');
    } else {
      setError('❌ Invalid Booking ID');
      setResult(null);
    }
  };

  return (
    <main className="check-status-page">
      <div className="card">
        <h2>Check Your Queue Status</h2>
        <p>Enter your booking ID to view your current queue status</p>
        <input
          type="text"
          id="bookingId"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          placeholder="Enter Booking ID"
        />
        <button id="checkBtn" onClick={handleCheck}>
          Check Status
        </button>
        {error && <p id="result" style={{ color: 'red' }}>{error}</p>}
        {result && (
          <p id="result" style={{ color: 'green' }}>
            ✅ Status Found <br />
            Booking ID : {result.id} <br />
            Name : {result.name} <br />
            Status : {result.status} <br />
            Queue Position : {result.position} <br />
            Service Desk : {result.counter}
          </p>
        )}
      </div>
    </main>
  );
}

export default CheckStatus;
