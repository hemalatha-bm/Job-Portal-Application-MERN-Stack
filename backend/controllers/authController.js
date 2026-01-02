const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Hardcoded Admin credentials
const adminEmail = 'admin@gmail.com';
const adminPassword = 'admin123';

// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Step 1: Check for hardcoded admin credentials
    if (email === adminEmail && password === adminPassword) {
      // Admin login successful
      const token = jwt.sign(
        { id: 'admin-id', role: 'admin' }, // Admin role payload
        process.env.SECRET_KEY,           // Secret key for JWT
        { expiresIn: '1h' }               // Token expiration (1 hour)
      );

      // Admin dashboard redirect
      return res.status(200).json({ 
        message: 'Admin login successful', 
        token, 
        redirectTo: '/admin-dashboard' 
      });
    }

    // Step 2: Check the email in the "users" collection only
    const user = await User.findOne({ email });

    // If no user is found
    if (!user) {
      return res.status(400).json({ message: 'User not registered' });
    }

    // Step 3: Verify password for the user
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Step 4: Generate a JWT token for the user
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Payload: user ID and role
      process.env.SECRET_KEY,           // Secret key for JWT
      { expiresIn: '1h' }               // Token expiration (1 hour)
    );

    // Define the redirect path based on the user's role
    const redirectTo = user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard';

    // Step 5: Send success response with token and redirect path
    res.status(200).json({ message: 'Login successful', token, redirectTo });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Signup function
exports.signup = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Step 1: Check if the user already exists in the "users" collection
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Step 2: Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 3: Determine the role (default to 'user' if not specified)
    const userRole = role || 'user'; // Default role is 'user' if not specified

    // Step 4: Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      role: userRole,
    });

    // Save the user to the database
    await newUser.save();

    // Step 5: Generate a JWT token for the newly created user
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role }, // Payload: user ID and role
      process.env.SECRET_KEY,                 // Secret key for JWT
      { expiresIn: '1h' }                     // Token expiration (1 hour)
    );

    // Define the redirect path based on the user's role
    const redirectTo = newUser.role === 'admin' ? '/admin-dashboard' : '/user-dashboard';

    // Respond with success message, token, and the redirect path
    res.status(201).json({ message: 'User created successfully', token, redirectTo });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
