import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./JobDetail.css";

const JobDetail = () => {
  const { jobId } = useParams(); // Get jobId from URL params
  const navigate = useNavigate();
  const [job, setJob] = useState(null); // State to hold job details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch job details based on jobId
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        const data = await response.json();

        if (response.ok) {
          setJob(data); // Set the job details to state
        } else {
          setError(data.error || "Failed to fetch job details");
        }
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Failed to fetch job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  // Handle save edited job details
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job), // Send the updated job details
      });

      const data = await response.json();

      if (response.ok) {
        alert("Job details updated successfully");
        navigate("/"); // Navigate back to dashboard
      } else {
        alert(data.error || "Failed to update job details");
      }
    } catch (err) {
      console.error("Error saving job details:", err);
      alert("Failed to save job details");
    }
  };

  // Handle changes to job details input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  return (
    <div className="job-detail-container">
      {loading && <p>Loading job details...</p>}
      {error && <p className="error">{error}</p>}
      {job && !loading && (
        <div className="job-detail">
          <h2>Job Details</h2>
          <div>
            <label>Job Title:</label>
            <input
              type="text"
              name="jobTitle"
              value={job.jobTitle}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={job.companyName}
              onChange={handleChange}
            />
          </div>
          {/* Add more fields for job details as needed */}
          <div className="buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => navigate("/")}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
