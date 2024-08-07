import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import  "../styles/Logout.css";
import axios from "axios";
import { LogoutRoute } from "../utils/APIRoutes";


const Logout = () => {
    const navigate = useNavigate();
    const handleClick = async () => {
      const id = await JSON.parse(
        localStorage.getItem("user")
      )._id;
      const data = await axios.get(`${LogoutRoute}/${id}`);
      if (data.status === 200) {
        localStorage.clear();
        navigate("/login");
      }
    };
    return (<div className="logout">
      <button onClick={handleClick}>
        <BiPowerOff />
      </button>
      </div>
    );
  }


export default Logout