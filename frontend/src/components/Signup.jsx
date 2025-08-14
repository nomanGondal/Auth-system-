import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Signup() {

const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup =async (e) => {
    e.preventDefault();

    // Here you would typically send formData to your backend API
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      toast.error('Please fill in all fields.', {
        position: 'top-center'
      });
      return;
    }

    // Simulate a successful signup

    try {
    
      const url="https://auth-system-riyx.onrender.com/auth/signup";
      const response =await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = response.json();
      console.log('Signup successful:', data);
       toast.success('Signup successful! 🎉', {
      position: 'top-center'
    });
setTimeout(() => {
      navigate('/login'); // Redirect to login page after signup   
   // 2 seconds delay
  }, 2000);
      // Simulate API call
    } catch (error) {
      toast.error('Signup failed. Please try again.', {
        position: 'top-center'
      });
    }




    
    // Clear the form
    setFormData({
      name: '',
      email: '',
      password: ''
    });


   
  
  }
  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <button type="submit">Signup</button>
        <p>
  Already have an account? <Link to="/Login">Login</Link>
</p>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Signup;
