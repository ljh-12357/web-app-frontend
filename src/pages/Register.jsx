import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      await register(username, email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      console.error('Register error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page page-wrapper">
      <div className="container">
        <div className="auth-container">
          <div className="auth-box pixel-card">
            <div className="auth-header">
              <h1 className="pixel-title">REGISTER</h1>
              <p className="auth-subtitle">CREATE NEW ACCOUNT</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="pixel-label">USERNAME:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pixel-input"
                  placeholder="CHOOSE A USERNAME"
                  required
                />
              </div>

              <div className="form-group">
                <label className="pixel-label">EMAIL:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pixel-input"
                  placeholder="YOUR@EMAIL.COM"
                  required
                />
              </div>

              <div className="form-group">
                <label className="pixel-label">PASSWORD:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pixel-input"
                  placeholder="MIN 6 CHARACTERS"
                  required
                />
              </div>

              <div className="form-group">
                <label className="pixel-label">CONFIRM PASSWORD:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pixel-input"
                  placeholder="REPEAT PASSWORD"
                  required
                />
              </div>

              {error && (
                <div className="pixel-error">[ERROR] {error}</div>
              )}

              <button
                type="submit"
                className="pixel-btn auth-btn"
                disabled={loading}
              >
                {loading ? 'CREATING...' : 'REGISTER'}
              </button>
            </form>

            <div className="auth-footer">
              <p>ALREADY HAVE AN ACCOUNT?</p>
              <Link to="/login" className="pixel-link">
                LOGIN HERE
              </Link>
            </div>
          </div>

          <div className="auth-decoration">
            <div className="pixel-art">
              <pre className="ascii-art">
{`
  ╔══════════════╗
  ║ NEW PLAYER!  ║
  ║              ║
  ║   ★ ★ ★ ★   ║
  ║              ║
  ║ JOIN THE     ║
  ║ ADVENTURE!   ║
  ╚══════════════╝
`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
