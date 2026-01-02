const express = require('express');
const mongoose = require('mongoose');
const AppliedJob = require('../models/AppliedJob');  // Import AppliedJob model
const Job = require('../models/Job');  // Import Job model
const User = require('../models/User');  // Import User model
const router = express.Router();

// Apply for the job
router.post('/', async (req, res) => {
  const {
    jobId,
    userEmail,
    jobTitle,
    companyName,
    companyEmail,
    location,
    salary,
    jobType,
    jobDescription,
    applicationDeadline
  } = req.body;

  console.log('Received data:', req.body); // Log the entire request body

  try {
    // Step 1: Check if the job exists
    console.log('Checking if job exists with jobId:', jobId);
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: 'Invalid job ID format' });
    }
    const job = await Job.findById(jobId); // Use jobId directly, no need for 'new' here
    if (!job) {
      return res.status(400).json({ message: 'Job not found' });
    }

    // Step 2: Check if the user exists
    console.log('Checking if user exists with email:', userEmail);
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Step 3: Check if the user has already applied for the job
    console.log('Checking if user has already applied for this job');
    const existingApplication = await AppliedJob.findOne({ jobId, userId: user._id });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Step 4: Create and save the new AppliedJob document
    const appliedJob = new AppliedJob({
      jobId,               // Job ID reference
      userId: user._id,    // User ID reference
      userEmail,
      jobTitle,
      companyName,
      companyEmail,
      location,
      salary,
      jobType,
      jobDescription,
      applicationDeadline
    });

    // Step 5: Save the applied job to the database
    await appliedJob.save();

    res.status(200).json({ message: 'Successfully applied for the job!' });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again.' });
  }
});

// Get all applied jobs
router.get('/', async (req, res) => {
  console.log('GET /api/applied-jobs route hit');
  try {
    // Populate jobId and userId with related job and user details
    const appliedJobs = await AppliedJob.find()
      .populate('jobId', 'jobTitle companyName') // Populate job details
      .populate('userId', 'email name'); // Populate user details (you can customize this based on your User model)

    res.status(200).json(appliedJobs); // Send the fetched applied jobs data
  } catch (error) {
    console.error('Error fetching applied jobs:', error);
    res.status(500).json({ message: 'Failed to fetch applied jobs' });
  }
});

module.exports = router;
