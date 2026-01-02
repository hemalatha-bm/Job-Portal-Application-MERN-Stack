import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditJob.css';

const EditJob = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState({
    jobTitle: '',
    companyName: '',
    jobDescription: '',
    salary: '',
    location: '',
    jobType: '',
    applicationDeadline: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // State for success message
  const navigate = useNavigate();

  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0]; // Formats to yyyy-mm-dd
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        if (!response.ok) throw new Error('Failed to fetch job details');
        const data = await response.json();
        data.applicationDeadline = formatDate(data.applicationDeadline); // Format the deadline date
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job),
      });
      if (!response.ok) throw new Error('Failed to update job details');
      setSuccessMessage('Job updated successfully!'); // Show success message
      setTimeout(() => {
        setSuccessMessage(null); // Hide the message after 3 seconds
        navigate('/admin-dashboard'); // Navigate after hiding the success message
      }, 3000);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleCancel = () => {
    navigate('/admin-dashboard');
  };

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="edit-job-container">
      <h1>Edit Job</h1>
      
      {/* Success Message */}
      {successMessage && <div className="alert success">{successMessage}</div>}

      <form onSubmit={handleSave}>
        <div>
          <label>Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            value={job.jobTitle || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={job.companyName || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Company Email:</label>
          <input
            type="text"
            name="companyEmail"
            value={job.companyEmail || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Job Description:</label>
          <textarea
            name="jobDescription"
            value={job.jobDescription || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Salary:</label>
          <input
            type="text"
            name="salary"
            value={job.salary || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={job.location || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Job Type:</label>
          <input
            type="text"
            name="jobType"
            value={job.jobType || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Application Deadline:</label>
          <input
            type="date"
            name="applicationDeadline"
            value={job.applicationDeadline || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-container">
          <button type="button" onClick={handleCancel} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="update-btn">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJob;
