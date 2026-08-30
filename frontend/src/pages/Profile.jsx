import { useEffect, useState } from 'react';
import api from '../services/api.js';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await api.get('/users/profile');

        if (!isMounted) return;

        setUser(response.data || null);
      } catch (err) {
        if (!isMounted) return;

        const status = err.response?.status;

        if (status === 401) {
          setError('Session expired or unauthorized. Please sign in again.');
        } else if (status >= 500) {
          setError('Server error while loading your profile. Please try again later.');
        } else {
          setError(err.response?.data?.message || err.response?.data?.error || 'Unable to load your profile.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="profile-page">
        <div className="profile-card">
          <h2>My Profile</h2>
          <p className="profile-message">Loading your profile...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="profile-page">
        <div className="profile-card">
          <h2>My Profile</h2>
          <p className="profile-error">{error}</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="profile-page">
        <div className="profile-card">
          <h2>My Profile</h2>
          <p className="profile-message">No profile data available.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <span className="status-pill">Profile</span>
          <h1>My Profile</h1>
        </div>

        <div className="profile-details">
          <div className="profile-row">
            <span>Full Name</span>
            <strong>{user.name || 'N/A'}</strong>
          </div>
          <div className="profile-row">
            <span>Email</span>
            <strong>{user.email || 'N/A'}</strong>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
