import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api.js';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
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

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
    };

    if (!payload.name || !payload.email || !payload.password) {
      setMessage('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (payload.password.length < 6) {
      setMessage('Password must contain at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
      await api.post('/users/add', payload);
      setMessage('Registration successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || error.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-main">
      <div className="login-card">
        <h2>Create Account</h2>
        <p className="login-text">Register to start using AntiQ</p>
        <form onSubmit={handleSubmit}>
          <div className="login-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
          {message && <p className="status-error" style={{ marginTop: '12px' }}>{message}</p>}
        </form>
        <div className="login-actions">
          <span>Already have an account?</span>
          <Link to="/login">Sign In</Link>
        </div>
      </div>
    </main>
  );
}

export default Register;
