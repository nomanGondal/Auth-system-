import React from "react";
import "./Navbar.css"; // Assuming you have a CSS file for styling
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
const navigate = useNavigate();
  const HandleLogout = () => {
    // Clear the token from localStorage
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate('/'); // Redirect to login page
  }
}
  return (
    <nav className="navbar">
      <div className="logo">BookCollection</div>
      <ul className="links">
        <li>
          <Link>Home</Link>
        </li>
        <li>
            <Link>About</Link>
        </li>
        <li>
            <Link>Dashboard</Link>
        </li>
        <button className="logout-btn" onClick={HandleLogout}>Logout</button>
      </ul>
    </nav>
  );
};


export default Navbar;
