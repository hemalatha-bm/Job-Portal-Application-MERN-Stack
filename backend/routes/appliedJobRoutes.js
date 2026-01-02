const express = require('express');
const router = express.Router();
const AppliedJob = require('../models/AppliedJob');
const Job = require('../models/Job');
const User = require('../models/User');

// Apply for a job
router.post('/apply', async (req, res) => {
  const { jobId, userId, userName, userEmail } = req.body;

  try {
    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({ message: 'Job not found' });
    }

    // Check if the user exists (you may already have this check during authentication)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Create a new AppliedJob document
    const appliedJob = new AppliedJob({
      jobId,
      userId,
      userName,
      userEmail,
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      location: job.location,
    });

    // Save the applied job
    await appliedJob.save();

    res.status(200).json({ message: 'Successfully applied for the job!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
});

module.exports = router;
