const Job = require('../models/Job'); // Import your Job model

// Get Job details by ID
exports.getJobDetails = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id); // Find job by ID
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    console.error('Error fetching job details:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
