
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contact";
import Welcome from "../components/Welcome";
import '../styles/Chat.css'
import { io } from "socket.io-client";


const Chat = () => {
  
   const navigate = useNavigate();
   const socket = useRef();
   const [contacts, setContacts] = useState([]);
   const [currentChat, setCurrentChat] = useState("");
   const [currentUser, setCurrentUser] = useState("");
   const [isloaded,setIsLoaded] = useState(false);
 
  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("user")) {
        navigate("/login");
      } else {
        const user = await JSON.parse(localStorage.getItem("user"));
        setCurrentUser(user);
        setIsLoaded(true);
      }
    };
   
    checkUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);


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

         {
            isloaded && currentChat === undefined ?(
            <Welcome currentUser={currentUser} />) :(
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>)

         }

        
      </div>
    </div>
  </>
);
}


    


export default Chat