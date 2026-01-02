import React, { useEffect, useState } from 'react';
import './AppliedJob.css'; // Optional: Style your component

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]); // State to hold applied jobs data
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to show loading status

  // Fetch applied jobs from the backend
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/applied-jobs');
        const data = await response.json();

        if (response.ok) {
          setAppliedJobs(data); // Update state with fetched applied jobs
        } else {
          setError(data.error || 'Failed to fetch applied jobs');
        }
      } catch (err) {
        console.error('Error fetching applied jobs:', err);
        setError('Failed to fetch applied jobs');
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <div className="applied-jobs-container">
      <h1>Applied Jobs</h1>
      {loading && <p>Loading applied jobs...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && appliedJobs.length > 0 ? (
        <div className="applied-jobs-list">
          {appliedJobs.map((job) => (
            <div className="applied-job-item" key={job._id}>
              <span className="job-title">{job.jobTitle}</span>
              <span className="company-name">{job.companyName}</span>
              <span className="applicant-name">{job.applicantName}</span>
              <span className="applicant-email">{job.applicantEmail}</span>
              <div className="job-details">
                <span>Job Description: {job.jobDescription}</span>
                {/* You can add more job details here if required */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No applied jobs found</p>
      )}
    </div>
  );
};

export default AppliedJobs;
