import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="pixel-header">
      <div className="container">
        <nav className="pixel-nav">
          <Link to="/" className="pixel-logo">
            <span className="logo-bracket">{'~'}</span>
            <span className="logo-text">KAWAII.DEV</span>
            <span className="logo-bracket">{'~'}</span>
          </Link>

          <div className="nav-links">
            <Link to="/" className="nav-link">HOME</Link>
            <Link to="/projects" className="nav-link">PROJECTS</Link>
            <Link to="/blog" className="nav-link">BLOG</Link>
            <Link to="/contact" className="nav-link">CONTACT</Link>

            {isAuthenticated ? (
              <>
                <Link to="/admin" className="nav-link nav-admin">ADMIN</Link>
                <button onClick={handleLogout} className="pixel-btn pixel-btn-small">
                  LOGOUT
                </button>
                <span className="nav-user">@{user?.username}</span>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">LOGIN</Link>
                <Link to="/register" className="pixel-btn pixel-btn-small">
                  REGISTER
                </Link>
              </>
            )}
          </div>

          <button className="mobile-menu-btn" id="mobileMenuBtn">
            |||
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
