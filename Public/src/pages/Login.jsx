import React from 'react'
import Logo from '../assets/logo.svg';
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import '../styles/Register.css';
import  { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';


export const Login = () => {

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
  
    password: "",
   
  });

 const handleSubmit = async (event) => {
    event.preventDefault();
   if(handleValidation ()){

    const { username, password } = values;
    const {data} = await axios.post(loginRoute, {  
      username,
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
  const { password,  username} = values;
  if (password ==="") {
    toast.error(
      "Username and Password Required.",
      toastOptions
    );
    return false;
  } else if (username.length === "") {
    toast.error(
      "Username and Password Required.",
      toastOptions
    );
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
            mim="3"
            onChange={(e) => handleChange(e)}
          />
         
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          
          <button type="submit">Login</button>
          <span>
           Don't have  an  account ? <Link to="/register">Register.</Link>
          </span>
        </form>
      <ToastContainer />
      
    </div>
  );
}

export default Login;