const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true }, 
  companyEmail: { type: String, required: true },// Added companyName field
  jobDescription: { type: String, required: true },
  salary: { type: String, required: true },
  location: { type: String, required: true },
  jobType: { type: String, required: true },
  applicationDeadline: { type: Date, required: true },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
