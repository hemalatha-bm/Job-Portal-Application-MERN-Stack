import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'user' }); // Added 'role' field
  const [message, setMessage] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login type change (User or Admin)
  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  // Handle form submission (Login)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Sending email, password, and role
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Save JWT token in localStorage
        alert('Logged in successfully');
        // Redirect based on user type (optional)
        if (formData.role === 'admin') {
          window.location.href = '/admin-dashboard'; // Redirect to admin dashboard
        } else {
          window.location.href = '/user-dashboard'; // Redirect to user dashboard
        }
      } else {
        setMessage(data.message); // Show error message from the backend
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        {/* Add a role selection for user/admin */}
        <div>
          <label>
            <input
              type="radio"
              name="role"
              value="user"
              checked={formData.role === 'user'}
              onChange={handleRoleChange}
            />
            User Login
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={formData.role === 'admin'}
              onChange={handleRoleChange}
            />
            Admin Login
          </label>
        </div>
        
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
