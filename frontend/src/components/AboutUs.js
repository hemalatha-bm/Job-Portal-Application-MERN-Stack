import React from 'react';
import './AboutUs.css'; 


const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="about-us-content">
        <h1>About Us!</h1>
        <p>Welcome to our Job Portal, where we connect talented individuals with their dream job opportunities!</p>
        <p>Our mission is to make job searching easy, transparent, and accessible to everyone. Whether you're looking for full-time, part-time, or freelance opportunities, we provide a platform where you can browse and apply to jobs that suit your skills and aspirations.</p>
        <p>Our goal is to create a seamless and supportive experience for both employers and job seekers.</p>
        
        <div className="quote">
          <p><em>"Opportunities don't happen, you create them." — Chris Grosser</em></p>
        </div>
        
        <div className="quote">
          <p><em>"The future depends on what we do in the present." — Mahatma Gandhi</em></p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
