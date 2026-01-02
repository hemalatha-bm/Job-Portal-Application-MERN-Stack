// Import required modules
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');  // Assuming the auth middleware is here
const Job = require('../models/Job');  // Assuming your Job model is here
const AppliedJob = require('../models/AppliedJob');  // Assuming your AppliedJob model is here

// Apply for a job route
router.post('/apply', auth, async (req, res) => {
  const { jobId, userName, userEmail } = req.body; // Get jobId, userName, and userEmail from the frontend

  try {
    // Check if the job exists in the database
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({ message: 'Job not found.' }); // Return error if job not found
    }

    // Store the applied job details in the AppliedJob collection
    const appliedJob = new AppliedJob({
      jobId,
      userName,
      userEmail,
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      location: job.location,
    });

    // Save the applied job to the database
    await appliedJob.save();

    // Respond with a success message
    res.status(200).json({ message: 'Successfully applied for the job!' });
  } catch (error) {
    console.error(error);
    // Handle server errors
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
