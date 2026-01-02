import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token); // Save admin token in localStorage
        alert('Admin logged in successfully!');
        navigate('/admin-dashboard'); // Redirect to Admin Dashboard
      } else {
        setMessage(data.message); // Display error message from the backend
      }
    } catch (error) {
      console.error('Error during admin login:', error);
      setMessage('Something went wrong. Please try again later.');
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
    buttonHover: {
      backgroundColor: '#3498db',
    },
    message: {
      marginTop: '20px',
      fontSize: '16px',
      color: 'red',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Admin Email"
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
          Login
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default AdminLogin;
