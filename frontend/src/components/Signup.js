import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // Track if the signup was successful
  const navigate = useNavigate(); // Initialize navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('User created successfully!');
        setIsSuccess(true); // Set success to true
        setFormData({ name: '', email: '', password: '' });

        // Redirect to the login page after 5 seconds
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      } else {
        setMessage(data.message);
        setIsSuccess(false); // Set success to false
      }

      // Clear the message after 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error during signup:', error);
      setMessage('Something went wrong. Please try again later.');
      setIsSuccess(false); // Set success to false

      // Clear the message after 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  const styles = {
    container: {
      width: '400px',
      margin: '50px auto',
      padding: '20px',
      backgroundColor: '#f7f9fc',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      color: '#2c3e50',
      fontSize: '24px',
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '12px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#2980b9',
      color: 'white',
      fontSize: '16px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      marginTop: '10px',
    },
    buttonSecondary: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#2980b9',
      color: 'white',
      fontSize: '16px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    buttonHover: {
      backgroundColor: '#3498db',
    },
    message: {
      marginTop: '20px',
      fontSize: '19px',
      color: isSuccess ? '#1aa00e' : 'red', // Green for success, red for error
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Sign Up
        </button>
      </form>
      <button
        style={styles.buttonSecondary}
        onClick={() => navigate('/login')} // Redirect to login page
      >
        Already signed up? Login
      </button>
      {message && (
        <p style={styles.message}>
          {message}
          {isSuccess && <br />} {/* Add a line break for the redirect message */}
          {isSuccess && 'Redirecting to login...'}
        </p>
      )}
    </div>
  );
};

export default Signup;
