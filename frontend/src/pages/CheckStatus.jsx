import { useEffect, useState } from 'react';
import api from '../services/api.js';

const getQueueName = (token) => {
  if (!token) return 'N/A';
  if (typeof token.queue === 'string') return token.queue;
  if (token.queue?.queueName) return token.queue.queueName;
  if (token.queueName) return token.queueName;
  return 'N/A';
};

function CheckStatus() {
  const [bookingId, setBookingId] = useState('');
  const [result, setResult] = useState(null);
  const [tokenList, setTokenList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserTokens = async () => {
      const token = localStorage.getItem('antiq_token');
      if (!token) {
        setError('Please sign in to check your queue status.');
        return;
      }

      try {
        const response = await api.get('/tokens/my');
        const tokens = Array.isArray(response.data) ? response.data : response.data.tokens || [];
        setTokenList(tokens);
        if (tokens.length > 0) {
          setBookingId(tokens[0]._id || tokens[0].id || '');
          setResult(tokens[0]);
        }
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || fetchError.response?.data?.error || 'Unable to load your queue status.');
      }
    };

    fetchUserTokens();
  }, []);

  const handleCheck = async () => {
    const id = bookingId.trim();
    setError('');

    if (!id) {
      setError('Please enter a booking ID.');
      setResult(null);
      return;
    }

    const token = localStorage.getItem('antiq_token');
    if (!token) {
      setError('Please sign in to check your queue status.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.get(`/tokens/${id}`);
      setResult(response.data);
    } catch (fetchError) {
      setResult(null);
      setError(fetchError.response?.data?.message || fetchError.response?.data?.error || 'Invalid Booking ID. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="check-status-page">
      <div className="status-card animate-up">
        <div className="status-card-header">
          <span className="status-pill">Live Queue</span>
          <h1>Check Your Queue Status</h1>
          <p>Enter your token ID or view your recent queue entries.</p>
        </div>

        <div className="status-form-row">
          <input
            type="text"
            value={bookingId}
            onChange={(event) => setBookingId(event.target.value)}
            placeholder="Enter Booking ID / Token ID"
            aria-label="Booking ID"
          />
          <button type="button" onClick={handleCheck} disabled={loading}>
            {loading ? 'Checking...' : 'Check Status'}
          </button>
        </div>

        {error && <div className="status-error">{error}</div>}

        {tokenList.length > 0 && !result && (
          <div className="status-result animate-up">
            <h2>Your Recent Tokens</h2>
            <div className="status-grid">
              {tokenList.map((token) => (
                <div key={token._id || token.id}>
                  <span>Token</span>
                  <strong>{token.tokenNumber || token._id}</strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {result && (
          <div className="status-result animate-up">
            <h2>Status Found</h2>
            <div className="status-grid">
              <div>
                <span>Booking ID</span>
                <strong>{result._id || result.id || 'N/A'}</strong>
              </div>
              <div>
                <span>Token Number</span>
                <strong>{result.tokenNumber || 'N/A'}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{result.status || 'N/A'}</strong>
              </div>
              <div>
                <span>Estimated Wait</span>
                <strong>{result.estimatedWaitTime || 'N/A'} min</strong>
              </div>
              <div>
                <span>Queue</span>
                <strong>{getQueueName(result)}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default CheckStatus;
