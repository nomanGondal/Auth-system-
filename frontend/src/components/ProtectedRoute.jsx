// components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    alert("Please log in first");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
