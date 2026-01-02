import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Home.css';
import Navbar from './Navbar';

function Home() {
  const [searchText, setSearchText] = useState('');
  const [hasSearched, setHasSearched] = useState(false); // State to track if the user has searched
  const navigate = useNavigate(); // Hook for navigation

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchText.trim() !== '') {
      setHasSearched(true); // Set search state to true when a search is made
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup'); // Redirect to signup page
  };

  return (
    <div className="home">
      <Navbar />
      <div className="home-content">
        <h1>Find the Most Exciting Startup Jobs</h1>
        <p>Your dream job is just a click away. Start your journey now!</p>
        <div className="home-search">
          <input 
            type="text" 
            placeholder="Job Title or keyword" 
            value={searchText} 
            onChange={handleSearchChange}
          />
          <button onClick={handleSearchClick}>Find Job</button>
        </div>
        {hasSearched && (
          <div className="login-message">
            <p>Please login to search for jobs!</p>
            <button onClick={handleSignupRedirect}>Click here to Sign Up</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
