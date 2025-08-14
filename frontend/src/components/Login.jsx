import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Login() {

const navigate = useNavigate();
  const [logininfo, setlogininfo] = useState({
    email: '',
    password: ''
  });

  

  const handleChange = (e) => {
    setlogininfo({
      ...logininfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup =async (e) => {
    e.preventDefault();

    // Here you would typically send formData to your backend API
    const { email, password } = logininfo;
    if ( !email || !password) {
      toast.error('Please fill in all fields.', {
        position: 'top-center'
      });
      return;
    }

    // Simulate a successful signup

    try {
    
      const url="http://localhost:3000/auth/login";
      const response =await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(logininfo)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data =await response.json();
      console.log('login successful:', data);
       toast.success('Login successful! 🎉', {
      position: 'top-center'
    });
   
    localStorage.setItem('token', data.token); // Store the token in localStorage
    localStorage.setItem('user', JSON.stringify(data.user)); // Store user info in localStorage

setTimeout(() => {
      navigate('/mainpage'); // Redirect to login page after signup   
   // 2 seconds delay
  }, 2000);
      // Simulate API call
    } catch (error) {
      toast.error('Login failed. Please try again.', {
        position: 'top-center'
      });
    }




    
    // Clear the form
    setlogininfo({
      email: '',
      password: ''
    });


   
  
  }
  return (
    <div className="Login-container">
      <h2>Login Account</h2>
      <form onSubmit={handleSignup}>
        
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={logininfo.email}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={logininfo.password}
          onChange={handleChange}
          required
        />
        
        <button type="submit">Login</button>

        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Login;
