import React, { useState, useEffect, useRef } from "react";
import Logout from './Logout'
import ChatInput from './ChatInput'
import Messages from './Messages'
import axios from 'axios'

import { sendMessageRoute } from '../utils/APIRoutes'
import { getMessagesRoute } from '../utils/APIRoutes'


const ChatContainer = ({currentChat,currentUser}) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
          const response = await axios.get({getMessagesRoute},
            { Form:currentUser._id,
             to:currentChat._id,});
             setMessages(response.data);
        };

       
        fetchUserData();
      }, [currentChat]);



    const handleSendMsg = async(msg) => {
   await axios.post(sendMessageRoute,{
     
    Form:currentUser._id,
    to:currentChat._id,
    message:msg,
    
});}
  return (
    <div className='Chatcontainer'>
      

      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <Messages/>
      <div className="chat-message">
         
       
        {messages.map((message) => {
          return (
            <div>
            <div
              
              className={`message ${
                message.from === currentUser._id ? "sent" : "received"
              }`}
            >
              <div className="content">

                <p>{message.message}</p>

              </div>
            </div>
            </div>
          );
        })



    
    }   
        


        

      </div>
      <ChatInput handleSendMsg={handleSendMsg}/>

      </div>



   
  )
}

export default ChatContainer