import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api.js';
import { connectSocket } from '../socket.js';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await api.post('/users/login', formData);
      localStorage.setItem('antiq_token', response.data.token);
      localStorage.setItem('antiq_user', JSON.stringify(response.data.user));
      connectSocket();
      setMessage('Login successful');
      navigate('/');
    } catch (error) {
      setMessage(error.response?.data?.message || error.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-main">
      <div className="login-card">
        <h2>Login</h2>
        <p className="login-text">Enter your credentials to access your account</p>
        <form onSubmit={handleSubmit}>
          <div className="login-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          {message && <p className="status-error" style={{ marginTop: '12px' }}>{message}</p>}
        </form>
        <div className="login-actions">
          <a href="#">Forgot password?</a>
          <span> / </span>
          <Link to="/register">Create an account</Link>
        </div>
      </div>
    </main>
  );
}

export default Login;
