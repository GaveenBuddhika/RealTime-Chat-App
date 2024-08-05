import React from 'react'
import Logo from '../assets/logo.svg';
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import '../styles/Register.css';
import  { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';


export const Register = () => {

  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };


  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);


 const handleSubmit = async (event) => {
    event.preventDefault();
   if(handleValidation ()){

    const { username, email, password } = values;
    const {data} = await axios.post(registerRoute, {  
      username,
      email,
      password,
    });

    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      localStorage.setItem("user",
        JSON.stringify(data.user)
      );
      navigate("/");
    }
  
    }
};


const handleValidation = () => {
  const { password, confirmPassword, username, email } = values;
  if (password !== confirmPassword) {
    toast.error(
      "Password and confirm password should be same.",
      toastOptions
    );
    return false;
  } else if (username.length < 3) {
    toast.error(
      "Username should be greater than 3 characters.",
      toastOptions
    );
    return false;
  } else if (password.length < 8) {
    toast.error(
      "Password should be equal or greater than 8 characters.",
      toastOptions
    );
    return false;
  } else if (email === "") {
    toast.error("Email is required.", toastOptions);
    return false;
  }

  return true;
};





const handleChange = (event) => {

  setValues({ ...values, [event.target.name]: event.target.value })
};




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
      <ToastContainer />
      
    </div>
  );
}

export default Register;