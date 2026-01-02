import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';  // Import the Navbar component
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import JobList from './components/JobList';
import AddJob from './components/AddJob';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import EditJob from './components/EditJob';
import UserDashboard from './components/UserDashboard';
import ViewAppliedJobs from './components/ViewAppliedJobs';

// Custom component to conditionally render Navbar based on route
const App = () => {
  const location = useLocation();
  
  // List of pages where Navbar should be visible
  const showNavbar = ["/login", "/signup", "/about-us", "/contact-us"].includes(location.pathname);

  return (
    <div className="App">
      {showNavbar && <Navbar />} {/* Conditionally render Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/edit-job/:jobId" element={<EditJob />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/view-applied-jobs" element={<ViewAppliedJobs />} />
      </Routes>
    </div>
  );
};

// Wrapper to include Router
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
