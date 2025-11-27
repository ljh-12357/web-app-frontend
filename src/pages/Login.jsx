import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      console.error('Login error:', err);
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
              <h1 className="pixel-title">LOGIN</h1>
              <p className="auth-subtitle">ENTER YOUR CREDENTIALS</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
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
                  placeholder="********"
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
                {loading ? 'LOGGING IN...' : 'LOGIN'}
              </button>
            </form>

            <div className="auth-footer">
              <p>DON'T HAVE AN ACCOUNT?</p>
              <Link to="/register" className="pixel-link">
                REGISTER HERE
              </Link>
            </div>
          </div>

          <div className="auth-decoration">
            <div className="pixel-art">
              <pre className="ascii-art">
{`
  ▄▄▄▄▄▄▄▄▄▄▄
 ██░░░░░░░░░██
 ██░░▓▓░░▓▓░██
 ██░░░░░░░░░██
 ██░░░████░░██
 ██░░░░░░░░░██
  ▀▀▀▀▀▀▀▀▀▀▀
`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
