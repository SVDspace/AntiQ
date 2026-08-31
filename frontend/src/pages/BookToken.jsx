import { useEffect, useState } from 'react';
import api from '../services/api.js';
import { getSocket, joinQueueRoom, leaveQueueRoom } from '../socket.js';

function BookToken() {
  const [queues, setQueues] = useState([]);
  const [selectedQueueId, setSelectedQueueId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchQueues = async () => {
      const token = localStorage.getItem('antiq_token');
      if (!token) {
        setMessage('Please sign in before booking a queue token.');
        return;
      }

      try {
        const response = await api.get('/queues');
        const list = Array.isArray(response.data) ? response.data : response.data.queues || [];
        setQueues(list);
        if (list.length > 0 && !selectedQueueId) {
          setSelectedQueueId(list[0]._id || list[0].id || '');
        }
      } catch (error) {
        setMessage(error.response?.data?.message || error.response?.data?.error || 'Unable to load available queues.');
      }
    };

    fetchQueues();
  }, [selectedQueueId]);

  useEffect(() => {
    if (!selectedQueueId) return undefined;

    const socket = getSocket();
    const handleQueueUpdate = async (payload) => {
      if (!payload || String(payload.queueId) !== String(selectedQueueId)) return;

      try {
        const response = await api.get('/queues');
        const list = Array.isArray(response.data) ? response.data : response.data.queues || [];
        setQueues(list);
      } catch (error) {
        setMessage(error.response?.data?.message || error.response?.data?.error || 'Queue status updated.');
      }
    };

    joinQueueRoom(selectedQueueId);
    socket.on('queue:updated', handleQueueUpdate);

    return () => {
      socket.off('queue:updated', handleQueueUpdate);
      leaveQueueRoom(selectedQueueId);
    };
  }, [selectedQueueId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedQueueId) {
      setMessage('Please select a queue first.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await api.post(`/tokens/join/${selectedQueueId}`);
      const tokenData = response.data || {};

      setMessage(
        `Token booked successfully. Your token number is ${tokenData.tokenNumber || 'N/A'} and estimated wait is ${tokenData.estimatedWaitTime || 0} minutes.`
      );
    } catch (error) {
      setMessage(error.response?.data?.message || error.response?.data?.error || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="book-token-page">
      <div className="book-wrapper">
        <div className="token-form-card">
          <h2>Book Your Token</h2>
          <p className="form-sub">Reserve your spot in advance and avoid on-site waiting.</p>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="queueSelect">Select Queue</label>
              <select
                id="queueSelect"
                value={selectedQueueId}
                onChange={(event) => setSelectedQueueId(event.target.value)}
                required
              >
                <option value="">Choose a queue</option>
                {queues.map((queue) => (
                  <option key={queue._id || queue.id} value={queue._id || queue.id}>
                    {queue.queueName || queue.name} — {queue.location}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-primary-token token-submit" disabled={loading || !selectedQueueId}>
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
            {message && <p className="status-error" style={{ marginTop: '12px' }}>{message}</p>}
          </form>
        </div>

        <div className="token-info-card">
          <h3>How Booking Works</h3>
          <ul>
            <li>Select your queue</li>
            <li>Confirm booking</li>
            <li>Get your token number</li>
            <li>Track live status</li>
          </ul>
          <div className="info-box">Token priority is based on queue order and service waiting time.</div>
        </div>
      </div>
    </section>
  );
}

export default BookToken;
