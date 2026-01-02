// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';  // Use Link to navigate between pages
import './Navbar.css';  // Make sure you have a Navbar.css file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo or Title */}
        <div className="navbar-logo">
          <h1>Job Portal</h1>
        </div>

        {/* Navbar Links */}
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
