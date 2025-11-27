import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pixel-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">KAWAII.DEV</h3>
            <p className="footer-text">
              Creating cute digital experiences
              <br />
              with love and pixels ~
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">QUICK LINKS</h4>
            <div className="footer-links">
              <a href="/" className="footer-link">HOME</a>
              <a href="/projects" className="footer-link">PROJECTS</a>
              <a href="/blog" className="footer-link">BLOG</a>
              <a href="/contact" className="footer-link">CONTACT</a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">CONNECT</h4>
            <div className="social-links">
              <span className="social-icon">[GH]</span>
              <span className="social-icon">[LI]</span>
              <span className="social-icon">[TW]</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="pixel-divider"></div>
          <p className="copyright">
            &copy; {currentYear} KAWAII.DEV | MADE WITH LOVE
          </p>
          <p className="footer-ascii">
            {'~'} THANK YOU FOR VISITING {'~'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
