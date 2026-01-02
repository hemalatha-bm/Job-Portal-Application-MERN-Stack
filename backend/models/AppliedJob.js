const mongoose = require('mongoose');

const appliedJobSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },  // Reference to the Job model
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  userEmail: { type: String, required: true },  // User's email
  jobTitle: { type: String, required: true },  // Job title
  companyName: { type: String, required: true },  // Company name
  companyEmail: { type: String, required: true },  // Company email
  location: { type: String, required: true },  // Job location
  salary: { type: String, required: true },  // Job salary
  jobType: { type: String, required: true },  // Job type (full-time, part-time, etc.)
  jobDescription: { type: String, required: true },  // Job description
  applicationDeadline: { type: Date, required: true },  // Application deadline
  appliedDate: { type: Date, default: Date.now }  // Date when the user applied for the job
});

module.exports = mongoose.model('AppliedJob', appliedJobSchema);
