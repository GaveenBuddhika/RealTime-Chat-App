
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contact";
import Welcome from "../components/Welcome";
import '../styles/Chat.css'

const Chat = () => {

   const navigate = useNavigate();
   const socket = useRef();
   const [contacts, setContacts] = useState([]);
   const [currentChat, setCurrentChat] = useState(undefined);
   const [currentUser, setCurrentUser] = useState("");
 
  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("user")) {
        navigate("/login");
      } else {
        const user = await JSON.parse(localStorage.getItem("user"));
        setCurrentUser(user);
      }
    };

    checkUser();
  }, [navigate]);
console.log(currentUser._id);
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
       
          const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data);
       
      }
    };

    fetchData();
  }, [currentUser, navigate]);

  const handleChatChange =(chat) => {

     setCurrentChat(chat);


  }


  return (
    <>
    <div className='chat'>
      <div className="container">

        <Contacts contacts={contacts}
         currentUser={currentUser} 
         changechat = {handleChatChange}/>

         <Welcome currentUser={currentUser} />
      </div>
    </div>
  </>
);
}


    


export default Chat