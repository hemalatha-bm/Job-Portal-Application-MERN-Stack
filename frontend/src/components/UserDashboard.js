import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './UserDashboard.css';

const UserDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [userName, setUserName] = useState('');  // State to store the username
  const navigate = useNavigate();

  const userEmail = Cookies.get('userEmail'); // Get user email from cookies

  // Fetch User Name Based on Email
  useEffect(() => {
    const fetchUserName = async () => {
      if (!userEmail) return;

      try {
        const response = await fetch(`http://localhost:5000/api/user?email=${userEmail}`);
        const data = await response.json();
        
        if (response.ok) {
          setUserName(data.userName); // Set the fetched username
        } else {
          setMessage({ text: 'Failed to fetch user name', type: 'error' });
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
        setMessage({ text: 'An error occurred while fetching user name.', type: 'error' });
      }
    };

    fetchUserName();
  }, [userEmail]); // Re-run if the userEmail changes

  // Fetch Jobs from Backend
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/jobs');
        const data = await response.json();

        if (response.ok) {
          setJobs(data);
          setFilteredJobs(data);
        } else {
          setMessage({ text: data.message || 'Failed to load job data.', type: 'error' });
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setMessage({ text: 'An error occurred while fetching jobs. Please try again later.', type: 'error' });
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  // Logout Handler
  const handleLogout = () => {
    Cookies.remove('userEmail');
    Cookies.remove('userName');  // Removing userName from cookies
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Search Handler with Debouncing
  const handleSearch = (query) => {
    setSearchQuery(query);
    clearTimeout(debouncedQuery);
    setDebouncedQuery(setTimeout(() => filterJobs(query), 500));
  };

  // Filter jobs based on the search query
  const filterJobs = (query) => {
    if (query.trim() === '') {
      setFilteredJobs(jobs); // Show all jobs if query is empty
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const results = jobs.filter((job) =>
        (job.jobTitle && job.jobTitle.toLowerCase().includes(lowerCaseQuery)) ||
        (job.companyName && job.companyName.toLowerCase().includes(lowerCaseQuery)) ||
        (job.location && job.location.toLowerCase().includes(lowerCaseQuery))
      );
      setFilteredJobs(results);
    }
  };

  // Date Formatter
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  // Job Application Handler
  const applyForJob = async (jobId) => {
    if (!userEmail) {
      setMessage({ text: 'Please log in to apply for jobs.', type: 'error' });
      return;
    }

    const jobToApply = jobs.find((job) => job._id === jobId);

    if (!jobToApply) {
      setMessage({ text: 'Job not found. Please try again.', type: 'error' });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/applied-jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: jobToApply._id,
          jobTitle: jobToApply.jobTitle,
          companyName: jobToApply.companyName,
          companyEmail: jobToApply.companyEmail,
          location: jobToApply.location,
          salary: jobToApply.salary,
          jobType: jobToApply.jobType,
          jobDescription: jobToApply.jobDescription,
          applicationDeadline: jobToApply.applicationDeadline,
          userEmail: userEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          text: `Successfully applied for the job: ${jobToApply.jobTitle}!`,
          type: 'success',
        });
      } else {
        setMessage({
          text: data.message || 'Unable to apply for the job. Please try again later.',
          type: 'error',
        });
      }
      
      // Clear the message after 3 seconds
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      console.error('Error applying for job:', error);
      setMessage({
        text: `An unexpected error occurred while applying. Error details: ${error.message}`,
        type: 'error',
      });
      
      // Clear the message after 3 seconds
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="navbar">
        <div className="navbar-title">Available Jobs</div>
        <div className="user-profile">
          {userName && <span className="user-name">Welcome, <span style={{ color: 'green' }}>{userName}</span>!</span>}
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for jobs, company and locations...."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {message.text && (
        <div className={`message ${message.type === 'success' ? 'message-success' : 'message-error'}`}>
          {message.text}
        </div>
      )}

      <div className="user-dashboard">
        {loading ? (
          <p>Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p className="no-jobs-message">No jobs found for your search criteria!</p>
        ) : (
          filteredJobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.jobTitle}</h3>
              <p>Company: {job.companyName}</p>
              <p>Company Mail: {job.companyEmail}</p>
              <p>Description: {job.jobDescription}</p>
              <p>Location: {job.location}</p>
              <p>Salary: {job.salary}</p>
              <p>Type: {job.jobType}</p>
              <p>Deadline: {formatDate(job.applicationDeadline)}</p>
              <button className="apply-btn" onClick={() => applyForJob(job._id)}>
                Apply Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
