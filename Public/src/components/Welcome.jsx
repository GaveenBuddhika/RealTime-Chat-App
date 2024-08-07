import React from "react";
import Robot from '../assets/robot.gif';
import '../styles/Welcome.css'



const Welcome = ({currentUser}) => {

   
  return (
    <div className='welcome'>

     <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>


    </div>
  )
}

export default Welcome