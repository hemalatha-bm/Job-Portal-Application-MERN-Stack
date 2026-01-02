const express = require('express');
const router = express.Router();

// Import the controller functions (ensure correct path)
const { signup, login } = require('../controllers/authController');

// Define routes and associate them with the controller functions
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
