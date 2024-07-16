import React from 'react'
import Logo from '../assets/logo.svg';
import { Link } from "react-router-dom";
import '../styles/Register.css';

export const Register = () => {

 const handleSubmit = (event) => {
    event.preventDefault();
    alert('form');

};

const handleChange = (event) => {};




  return (
    <div className='FormContainer'>
      
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>CHATTY</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already  have  an  account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      
      
    </div>
  );
}

export default Register;