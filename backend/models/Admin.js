// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
});

// Explicitly specify the collection name 'admins'
module.exports = mongoose.model('Admin', adminSchema, 'admins'); // Explicit collection name
