const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); // Ensure the correct path for this file
const adminRoutes = require('./routes/adminRoutes');
const jobRoutes = require('./routes/jobRoutes');
const appliedJobsRoute = require('./routes/appliedJobs');
const userRoutes = require('./routes/userroutes');
 // Corrected import name

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();
const port = process.env.PORT || 5000; // Use environment port or default to 5000

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse incoming JSON request bodies
app.use(bodyParser.json()); // Ensure to use bodyParser for JSON request parsing

// MongoDB connection using environment variable for Mongo URI
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/JobPortal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Mount routes
app.use('/api/auth', authRoutes); // Ensure that the route files are correctly set up
app.use('/api/admin', adminRoutes); // Mount admin routes at /api/admin
app.use('/api/jobs', jobRoutes); // Mount job routes at /api/jobs
app.use('/api/applied-jobs', appliedJobsRoute); // Mount applied jobs route correctly
app.use('/api', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
