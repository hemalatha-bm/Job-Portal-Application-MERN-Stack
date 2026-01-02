import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]); // State to hold job data
  const [filteredJobs, setFilteredJobs] = useState([]); // State for filtered jobs
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to show loading status
  const [message, setMessage] = useState(null); // State for success message

  // Fetch jobs from the database
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs"); // Fetch job data from backend
        const data = await response.json();

        if (response.ok) {
          setJobs(data); // Update state with fetched jobs
          setFilteredJobs(data); // Initialize filtered jobs with all jobs
        } else {
          setError(data.error || "Failed to fetch jobs");
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchJobs();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // Filter jobs based on the search term
    const filtered = jobs.filter(
      (job) =>
        job.jobTitle.toLowerCase().includes(searchValue) ||
        job.companyName.toLowerCase().includes(searchValue)
    );
    setFilteredJobs(filtered); // Update filtered jobs
  };

  // Handle delete job
  const handleDelete = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setJobs(jobs.filter((job) => job._id !== jobId)); // Remove deleted job from the state
        setFilteredJobs(filteredJobs.filter((job) => job._id !== jobId)); // Update filtered jobs
        setMessage("Job deleted successfully!"); // Show success message
        setTimeout(() => {
          setMessage(null); // Clear the message after 4 seconds
        }, 3000); // 4 seconds delay
      } else {
        const data = await response.json();
        setError(data.error || "Failed to delete job");
      }
    } catch (err) {
      console.error("Error deleting job:", err);
      setError("Failed to delete job");
    }
  };

  // Handle edit job (Navigate to JobDetail page with job ID)
  const handleEdit = (jobId) => {
    navigate(`/edit-job/${jobId}`); // Navigate to job detail page with job ID
  };

  // Handle add job
  const handleAddJob = () => {
    navigate("/add-job"); // Navigate to add job page
  };

  // Handle view applied jobs
  const handleViewAppliedJobs = () => {
    navigate("/view-applied-jobs"); // Navigate to view applied jobs page
  };

  // Handle logout
  const handleLogout = () => {
    navigate("/login"); // Navigate to login page
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Admin Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="Search job by title or company"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="job-count">
          Total Jobs: {filteredJobs.length}
        </div>
        <button className="add-job-button" onClick={handleAddJob}>
          Add Job
        </button>
        <button className="view-applied-button" onClick={handleViewAppliedJobs}>
          View Applied Jobs
        </button>
      </div>

      {/* Displaying messages */}
      {message && <div className="message success">{message}</div>}
      {error && <div className="message error">{error}</div>}

      <div className="job-list">
        {loading && <p>Loading jobs...</p>}
        {error && !loading && <p className="error">{error}</p>}
        {!loading && filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div className="job-item" key={job._id}>
              <span className="job-title">{job.jobTitle}</span>
              <span className="company-name">{job.companyName}</span>
              <div className="job-buttons">
                <button
                  className="edit-button"
                  onClick={() => handleEdit(job._id)}
                >
                  View Details & Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No jobs available</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
