import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewAppliedJobs.css';  // Make sure to include your styles here

const ViewAppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch the applied jobs when the component mounts
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL || 'http://localhost:5000/api/applied-jobs');
        setAppliedJobs(response.data);
        setFilteredJobs(response.data); // Initially, show all jobs
      } catch (err) {
        setError('Failed to fetch applied jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();

    // Cleanup function for API call
    return () => {
      setLoading(false); // Reset loading state on unmount
    };
  }, []);

  // Filter applied jobs based on the search term
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);

    const filtered = appliedJobs.filter((job) =>
      job.jobTitle.toLowerCase().includes(query) ||
      job.companyName.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query)
    );
    setFilteredJobs(filtered);
  };

  // Handle back button click to navigate to admin dashboard
  const handleBackButtonClick = () => {
    navigate('/admin-dashboard');
  };

  // Helper function to format date
  const formatDate = (date) => {
    const validDate = new Date(date);
    return isNaN(validDate) ? 'Invalid Date' : validDate.toLocaleDateString();
  };

  if (loading) {
    return <div className="loading-state">Loading...</div>;
  }

  if (error) {
    return <div className="error-state">{error}</div>;
  }

  return (
    <div className="applied-jobs-container">
      {/* Back Button */}
      <button className="back-button" onClick={handleBackButtonClick}>
        Back
      </button>

      {/* Applied Jobs Heading */}
      <h2>Applied Jobs</h2>

      {/* Search Bar Container */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by Job Title, Location or Company Name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>

      {/* Displaying the Table or No Data Message */}
      {filteredJobs.length === 0 ? (
        <p>No applied jobs available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company Name</th>
              <th>Company Email</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Application Deadline</th>
              <th>Applied At</th>
              <th>User Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job._id}>
                <td>{job.jobTitle}</td>
                <td>{job.companyName}</td>
                <td>{job.companyEmail}</td>
                <td>{job.location}</td>
                <td>{job.salary}</td>
                <td>{formatDate(job.applicationDeadline)}</td>
                <td>{formatDate(job.appliedDate)}</td>
                <td>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${job.userEmail}&su=Regarding%20Your%20Job%20Application&body=Dear%20${job.userName || 'Applicant'},%0D%0A%0D%0AWe%20are%20pleased%20to%20inform%20you%20that%20your%20application%20for%20the%20position%20of%20${job.jobTitle}%20at%20${job.companyName}%20has%20been%20received.%0D%0A%0D%0AOur%20team%20is%20currently%20reviewing%20all%20applications,%20and%20we%20will%20contact%20you%20if%20your%20profile%20matches%20our%20requirements.%0D%0A%0D%0AIn%20the%20meantime,%20we%20encourage%20you%20to%20keep%20pushing%20forward%20in%20your%20career%20journey.%0D%0A%0D%0AIf%20you%20have%20any%20questions,%20please%20feel%20free%20to%20contact%20us%20at%20${job.companyEmail.toLowerCase()}.%0D%0A%0D%0ALooking%20forward%20to%20hearing%20from%20you.%0D%0A%0D%0AThank%20you%20for%20your%20interest%20in%20joining%20our%20team.%0D%0A%0D%0ABest%20Regards,%0D%0A${job.companyName}.%0D%0A${job.companyName}%20Recruitment%20Team!`}
                    className="email-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {job.userEmail}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAppliedJobs;
