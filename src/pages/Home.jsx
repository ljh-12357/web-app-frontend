import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-avatar">
              <div className="avatar-frame">
                <div className="avatar-pixel">
                  <span className="avatar-face">^_^</span>
                </div>
                <div className="avatar-hearts">
                  <span className="floating-heart">&#9829;</span>
                  <span className="floating-heart">&#9829;</span>
                  <span className="floating-heart">&#9829;</span>
                </div>
              </div>
            </div>

            <div className="hero-text">
              <p className="hero-greeting">~ HELLO, WORLD! ~</p>
              <h1 className="hero-title">
                I AM A <span className="highlight">KAWAII</span>
                <br />
                DEVELOPER
              </h1>
              <p className="hero-description">
                CREATING CUTE DIGITAL EXPERIENCES WITH LOVE ~
                <br />
                FULL-STACK DEVELOPER | CREATIVE CODER | PIXEL ARTIST
              </p>

              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-value">10+</span>
                  <span className="stat-label">PROJECTS</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">3+</span>
                  <span className="stat-label">YEARS EXP</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">100%</span>
                  <span className="stat-label">PASSION</span>
                </div>
              </div>

              <div className="hero-buttons">
                <Link to="/projects" className="pixel-btn">
                  VIEW PROJECTS
                </Link>
                <Link to="/contact" className="pixel-btn pixel-btn-secondary">
                  CONTACT ME
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="skills-section">
        <div className="container">
          <h2 className="pixel-title">~ MY SKILLS ~</h2>
          <div className="skills-grid">
            <div className="skill-card pixel-card">
              <div className="skill-icon">JS</div>
              <h3 className="skill-name">JAVASCRIPT</h3>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div className="skill-card pixel-card">
              <div className="skill-icon">RE</div>
              <h3 className="skill-name">REACT</h3>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="skill-card pixel-card">
              <div className="skill-icon">NO</div>
              <h3 className="skill-name">NODE.JS</h3>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div className="skill-card pixel-card">
              <div className="skill-icon">DB</div>
              <h3 className="skill-name">MONGODB</h3>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="skill-card pixel-card">
              <div className="skill-icon">CS</div>
              <h3 className="skill-name">CSS/SASS</h3>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '88%' }}></div>
              </div>
            </div>
            <div className="skill-card pixel-card">
              <div className="skill-icon">GI</div>
              <h3 className="skill-name">GIT</h3>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-box pixel-card">
            <h2 className="cta-title">READY TO START A PROJECT?</h2>
            <p className="cta-text">
              LET'S CREATE SOMETHING CUTE TOGETHER!
            </p>
            <Link to="/contact" className="pixel-btn">
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
