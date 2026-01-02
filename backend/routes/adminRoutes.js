const express = require('express');
const router = express.Router();  // Initialize the router

// Admin login route
router.post('/admin-login', async (req, res) => {
  const { email, password } = req.body;

  // Hardcoded admin credentials for demonstration (replace with DB in production)
  if (email === 'admin@gmail.com' && password === 'admin123') {
    res.status(200).json({ message: 'Login successful', role: 'admin', token: 'some-jwt-token' });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;  // Export the router
