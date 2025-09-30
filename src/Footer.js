import React, { useState } from 'react';
import { 
  FaFacebook, 
  FaTwitter, 
  FaPinterest, 
  FaInstagram, 
  FaYoutube,
  FaApple,
  FaGooglePlay,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      alert('Thank you for subscribing!');
    }, 1000);
  };

  const handleVendorRegistration = () => {
    alert('Redirecting to vendor registration...');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section about-section">
          <h3 className="footer-title">Catalyst Wedding - Your Personal Wedding Planner</h3>
          <h4 className="footer-subtitle">Plan your wedding with Us</h4>
          <p className="footer-description">
            Catalyst Wedding is an Indian Wedding Planning Website and app where you can find the best wedding vendors, 
            with prices and reviews at the click of a button. Whether you are looking to hire wedding planners 
            in India, or looking for the top photographers, or just some ideas and inspiration for your wedding. 
            Catalyst Wedding can help you solve your wedding planning woes through its unique features. With a checklist, 
            detailed vendor list, inspiration gallery and blog - you won't need to spend hours planning a wedding anymore.
          </p>
        </div>

        {/* Contact Section */}
        <div className="footer-section contact-section">
          <h4 className="section-title">Contact us to get best deals</h4>
          
          <div className="contact-group">
            <h5 className="contact-label">For Vendors:</h5>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <a href="mailto:vendors@wedmegood.com">vendors@catalyst.com</a>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <a href="tel:0124-6812346">0124-6812346</a>
            </div>
          </div>

          <div className="contact-group">
            <h5 className="contact-label">For Users:</h5>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <a href="mailto:info@wedmegood.com">info@catalyst.com</a>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <a href="tel:0124-6812345">0124-6812345</a>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="footer-section social-section">
          <h4 className="section-title">Follow us on:</h4>
          <div className="social-links">
            <a href="#" className="social-link facebook" aria-label="Facebook">
              <FaFacebook /> Facebook

            </a>
            <a href="#" className="social-link twitter" aria-label="Twitter">
              <FaTwitter /> Twitter
            </a>
            <a href="#" className="social-link pinterest" aria-label="Pinterest">
              <FaPinterest /> Pinterest
            </a>
            <a href="#" className="social-link instagram" aria-label="Instagram">
              <FaInstagram /> Instagram
            </a>
            <a href="#" className="social-link youtube" aria-label="YouTube">
              <FaYoutube /> Youtube
            </a>
          </div>
        </div>       

        {/* Address Section */}
        <div className="footer-section address-section">
          <h4 className="section-title">Registered Address</h4>
          <div className="address-item">
            <FaMapMarkerAlt className="address-icon" />
            <span>
              Second Floor, Ocus Technopolis, Sector 54 Golf Course Road, 
              Gurgaon, Haryana, India, 122002
            </span>
          </div>
        </div>

        {/* Newsletter Section with Marriage Quote */}
        <div className="newsletter-container">
          {/* Newsletter Card */}
          <div className="footer-section newsletter-section confetti-section">
            <h4 className="section-title">Get Latest Blog Alerts</h4>
            
            
            <button 
              onClick={handleVendorRegistration}
              className="vendor-register-btn"
            >
              Register as a Vendor
            </button>

            {/* Confetti Animation Elements */}
            <div className="confetti-container">
              <div className="confetti confetti-1"></div>
              <div className="confetti confetti-2"></div>
              <div className="confetti confetti-3"></div>
              <div className="confetti confetti-4"></div>
              <div className="confetti confetti-5"></div>
              <div className="confetti confetti-6"></div>
              <div className="confetti confetti-7"></div>
              <div className="confetti confetti-8"></div>
            </div>
          </div>

   
        </div>
               {/* Marriage Quote - Right Side */}
               <div className="marriage-quote-card">
            <div className="quote-content">
              <div className="quote-icon">
                <FaHeart />
              </div>
              <blockquote className="quote-text">
                "Love is not about finding the perfect person, but about seeing an imperfect person perfectly. 
                <br />
                <span className="quote-highlight">Start your forever today!</span>"
              </blockquote>
              <div className="quote-author">- Catalyst Wedding</div>
            </div>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
