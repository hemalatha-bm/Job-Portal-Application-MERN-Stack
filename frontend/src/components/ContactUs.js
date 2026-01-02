import React from 'react';
import './ContactUs.css';
 

const ContactUs = () => {
  return (
    <div className="contact-us">
      <div className="contact-us-content">
        <h1>Contact Us!</h1>
        <p>We would love to hear from you! </p>
        <p>Reach out to us using the information below:</p>
        
        <div className="contact-details">
          <h2>Our Office</h2>
          <p><strong>Address:</strong> 123 Job Portal St., City, Country</p>
          <p><strong>Phone:</strong> + 1234567890</p>
          <p><strong>Email:</strong> support@jobportal.com</p>
        </div>

        <div className="social-links">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
