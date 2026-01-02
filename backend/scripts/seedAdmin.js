// scripts/seedAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin'); // Path to your Admin model

mongoose.connect('mongodb://localhost:27017/JobPortal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');

  // Check if an admin already exists
  const adminExists = await Admin.findOne({ email: 'admin@gmail.com' });
  if (adminExists) {
    console.log('Admin already exists!');
    return mongoose.connection.close();
  }

  // Create a new admin if not already created
  const hashedPassword = await bcrypt.hash('admin123', 10); // Example password

  const newAdmin = new Admin({
    email: 'admin@gmail.com', // Admin email
    password: hashedPassword,   // Hashed password
  });

  // Save admin to the database
  await newAdmin.save();
  console.log('Admin created successfully');
  
  // Close the connection
  mongoose.connection.close();
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
