import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Import your components
import Home from "./components/Home";
import Signup from './components/Signup';
import Login from './components/Login';
import Mainpage from './components/Mainpage';
import ProtectedRoute from './components/ProtectedRoute';

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
      if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup") {
        navigate("/mainpage");
      }
    }
    else if(location.pathname === "/login"  || location.pathname !== "/signup") {
      setIsAuthenticated(false);
       
        navigate("/login");
      
    }
    else {
      setIsAuthenticated(false);
      navigate ("/")
    }
    
    
  }, [location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/mainpage"
        element={
          <ProtectedRoute>
            <Mainpage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
