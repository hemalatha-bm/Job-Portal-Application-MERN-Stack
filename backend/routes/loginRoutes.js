const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the entered password with the hashed password from the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token if login is successful
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role }, // Include role in the JWT payload
      process.env.SECRET_KEY, // Make sure you have set a SECRET_KEY in your .env file
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Respond with the JWT token and user role
    res.status(200).json({ message: 'Login successful', token, role: user.role });

  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
