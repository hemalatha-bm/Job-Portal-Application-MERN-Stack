const express = require('express');
const router = express.Router();
const Job = require('../models/Job'); // Import Job model to interact with the database
const AppliedJob = require('../models/AppliedJob'); // Assuming you have an AppliedJob model

// GET route to fetch all job details
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find(); // Fetch all jobs from the 'jobs' collection
    res.json(jobs); // Send the jobs as a JSON response
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Apply for a job
router.post('/apply', async (req, res) => {
  const { email, jobId, jobTitle, companyName, companyEmail, location, salary, jobType, jobDescription, applicationDeadline } = req.body;

  try {
    // Create a new applied job entry
    const newAppliedJob = new AppliedJob({
      email,
      jobTitle,
      companyName,
      companyEmail,  // Added companyEmail here
      location,
      salary,
      jobType,
      jobDescription,
      applicationDeadline,
    });

    // Save the application to the database
    await newAppliedJob.save();
    res.status(200).json({ message: 'Job application successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to apply for the job. Please try again.' });
  }
});

// GET route to fetch a specific job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id); // Find job by ID
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job); // Send the job details as a JSON response, including companyEmail
  } catch (err) {
    console.error("Error fetching job details:", err);
    res.status(500).json({ error: 'Failed to fetch job details' });
  }
});

// Route to add a new job
router.post('/add-job', async (req, res) => {
  try {
    const { jobTitle, companyName, companyEmail, jobDescription, salary, location, jobType, applicationDeadline } = req.body;

    // Validate required fields
    if (!jobTitle || !companyName || !companyEmail || !jobDescription || !salary || !location || !jobType || !applicationDeadline) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new job document
    const newJob = new Job({
      jobTitle,
      companyName,
      companyEmail,  // Store companyEmail
      jobDescription,
      salary,
      location,
      jobType,
      applicationDeadline,
    });

    await newJob.save(); // Save the job in the database
    res.status(201).json({ message: 'Job added successfully', job: newJob }); // Respond with success message
  } catch (error) {
    console.error('Error adding job:', error);
    res.status(500).json({ error: 'Failed to add job' });
  }
});

// Route to delete a job
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the job ID from the route parameters
    const job = await Job.findByIdAndDelete(id); // Find and delete the job by ID

    if (!job) {
      return res.status(404).json({ error: 'Job not found' }); // Return error if job doesn't exist
    }

    res.status(200).json({ message: 'Job deleted successfully' }); // Respond with success message
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

// Route to update a job
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the job ID from the route parameters
    const { jobTitle, companyName, companyEmail, jobDescription, salary, location, jobType, applicationDeadline } = req.body;

    // Validate required fields
    if (!jobTitle || !companyName || !companyEmail || !jobDescription || !salary || !location || !jobType || !applicationDeadline) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Find and update the job by ID
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        jobTitle,
        companyName,
        companyEmail,  // Include companyEmail in update
        jobDescription,
        salary,
        location,
        jobType,
        applicationDeadline,
      },
      { new: true } // Return the updated job document
    );

    if (!updatedJob) {
      return res.status(404).json({ error: 'Job not found' }); // Return error if job doesn't exist
    }

    res.status(200).json({ message: 'Job updated successfully', job: updatedJob }); // Respond with success message
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
});

module.exports = router;
