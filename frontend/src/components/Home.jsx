import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Our App</h1>
      <p>Navigate to Signup or Login to get started.</p>
      <Link to="/signup" className="home-link">Signup</Link>
      <Link to="/login" className="home-link">Login</Link>
    </div>
  );
}

export default Home;
