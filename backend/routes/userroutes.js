const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User'); // Assuming User is a Mongoose model
const router = express.Router();

// Route to get the username based on the user's email
router.get('/user', async (req, res) => {
  const { email } = req.query; // Get email from query parameters

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email }); // Find user in DB by email

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the username as the response
    res.json({ userName: user.username });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'An error occurred while fetching user data' });
  }
});

module.exports = router;
