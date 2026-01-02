import React from 'react';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');  // Check if the token is present

  if (!token) {
    return <Redirect to="/login" />;  // Redirect to login if no token is found
  }

  return children;  // Show the protected content (job application) if the token is found
};

export default ProtectedRoute;
