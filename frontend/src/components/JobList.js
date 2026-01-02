import React from 'react';
import './JobList.css';

function JobList() {
  return (
    <div className="job-list">
      <h2>Available Jobs</h2>
      <ul>
        <li>Job 1: Frontend Developer</li>
        <li>Job 2: Backend Developer</li>
        <li>Job 3: Full Stack Developer</li>
      </ul>
    </div>
  );
}

export default JobList;
