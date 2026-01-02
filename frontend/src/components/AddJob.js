import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddJob.css';

const AddJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    companyEmail: '',  // Added companyEmail field
    jobDescription: '',
    salary: '',
    location: '',
    jobType: '',
    applicationDeadline: '',
  });

  const [message, setMessage] = useState(null); // Message state to show success or error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/jobs/add-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        setTimeout(() => {
          setMessage(null); // Hide the message after 4 seconds
          navigate('/admin-dashboard'); // Redirect to admin dashboard
        }, 4000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to add job' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'Failed to add job' });
    }
  };

  return (
    <div className="form-container">
      <h2>Add a Job</h2>

      {/* Display Message (Success or Error) */}
      {message && (
        <div className={`alert ${message.type}`}>
          <span className={`alert-icon ${message.type}`}>
            {message.type === 'success' ? '✔️' : '❌'}
          </span>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Enter Job Title"
            required
          />
        </div>

        <div className="form-group">
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter Company Name"
            required
          />
        </div>

        {/* Added company email field */}
        <div className="form-group">
          <label>Company Email:</label>
          <input
            type="email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
            placeholder="Enter Company Email"
            required
          />
        </div>

        <div className="form-group">
          <label>Job Description:</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            placeholder="Enter Job Description"
            required
          />
        </div>

        <div className="form-group">
          <label>Salary:</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter Salary"
            required
          />
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter Job Location"
            required
          />
        </div>

        <div className="form-group">
          <label>Job Type:</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            required
          >
            <option value="">Select Job Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="form-group">
          <label>Application Deadline:</label>
          <input
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
            required
          />
        </div>

        <div className="buttons">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
