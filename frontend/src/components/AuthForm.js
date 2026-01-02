import React, { useState } from 'react';

const AuthForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(false);  // Toggle between login and signup

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? 'login' : 'signup';
    const url = `http://localhost:5000/api/auth/${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setFormData({ email: '', password: '', name: '' });

        if (isLogin) {
          // Handle successful login (e.g., store the JWT token in localStorage)
          localStorage.setItem('token', data.token);
          // Redirect to the dashboard or home page
          window.location.href = '/dashboard'; // Example redirect
        }
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error during signup/login:', error);
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div>
      <h1 style={{ color: 'blue' }}>{isLogin ? 'Login' : 'Signup'}</h1>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
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
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'New here? Sign up' : 'Already registered? Login'}
      </button>
    </div>
  );
};

export default AuthForm;
