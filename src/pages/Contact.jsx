import { useState } from 'react';
import { contactAPI } from '../services/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await contactAPI.send(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1 className="pixel-title">{'<'} CONTACT ME {'>'}</h1>
          <p className="page-description">
            GOT A PROJECT IN MIND? LET'S TALK!
            <br />
            FILL OUT THE FORM BELOW AND I'LL GET BACK TO YOU.
          </p>
        </div>

        <div className="contact-content">
          <form onSubmit={handleSubmit} className="contact-form pixel-card">
            <div className="form-group">
              <label className="pixel-label">YOUR NAME:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="pixel-input"
                placeholder="ENTER YOUR NAME..."
                required
              />
            </div>

            <div className="form-group">
              <label className="pixel-label">YOUR EMAIL:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pixel-input"
                placeholder="ENTER YOUR EMAIL..."
                required
              />
            </div>

            <div className="form-group">
              <label className="pixel-label">YOUR MESSAGE:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="pixel-textarea"
                placeholder="TYPE YOUR MESSAGE HERE..."
                required
              />
            </div>

            {error && (
              <div className="pixel-error">[ERROR] {error}</div>
            )}

            {success && (
              <div className="pixel-success">
                [SUCCESS] MESSAGE SENT! I'LL GET BACK TO YOU SOON.
              </div>
            )}

            <button
              type="submit"
              className="pixel-btn"
              disabled={loading}
            >
              {loading ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>

          <div className="contact-info pixel-card">
            <h3 className="pixel-subtitle">OTHER WAYS TO REACH ME:</h3>

            <div className="info-item">
              <span className="info-icon">[EMAIL]</span>
              <span className="info-text">hello@pixeldev.com</span>
            </div>

            <div className="info-item">
              <span className="info-icon">[LOCATION]</span>
              <span className="info-text">CYBERSPACE</span>
            </div>

            <div className="info-item">
              <span className="info-icon">[STATUS]</span>
              <span className="info-text status-available">AVAILABLE FOR HIRE</span>
            </div>

            <div className="pixel-divider"></div>

            <div className="social-section">
              <p className="social-title">FIND ME ON:</p>
              <div className="social-buttons">
                <span className="pixel-btn pixel-btn-small">[GITHUB]</span>
                <span className="pixel-btn pixel-btn-small">[LINKEDIN]</span>
                <span className="pixel-btn pixel-btn-small">[TWITTER]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
