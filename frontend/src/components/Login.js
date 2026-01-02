import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import the js-cookie library
import './Login.css'; // Ensure your CSS file is correctly linked

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState(''); // To display success or error messages
  const [isUserNotRegistered, setIsUserNotRegistered] = useState(false); // State for showing sign up button
  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform the API call to your backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        // Successful login: store token and email in cookies
        localStorage.setItem('token', data.token); // Save token in localStorage
        Cookies.set('userEmail', formData.email, { expires: 7 }); // Store email in cookies for 7 days
        setMessage('Login successful! Redirecting...');

        setTimeout(() => {
          navigate(data.redirectTo || '/user-dashboard'); // Default redirection
        }, 2000);
      } else {
        // Check if the error message indicates that the user is not registered
        if (data.message === 'User not registered') {
          setMessage('User not registered. Please create an account.');
          setIsUserNotRegistered(true); // Show the Create Account button
        } else {
          setMessage(data.message || 'Invalid email or password.');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Something went wrong. Please try again later.');
    }
  };

  // Handle redirection to sign-up page
  const handleCreateAccount = () => {
    navigate('/signup'); // Redirect to registration page
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      {isUserNotRegistered && (
        <div>
          <button onClick={handleCreateAccount} className="create-account-btn">
            Create Account!Sign Up
          </button>
          {message && <p>{message}</p>}
        </div>
      )}

      {!isUserNotRegistered && message && <p>{message}</p>}
    </div>
  );
};

export default Login;
