import React, { useState, useEffect } from "react";
import "../styles/Contacts.css";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts,currentUser,changechat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if(currentUser){
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changechat(contact);
   
  };

  return (
<>
    <div className="contactcontainer">
         { currentUserName && (
<>
<div className="brand">
        <img src={Logo} alt="logo" />
        <h3>CHATTY</h3>
        </div>
        <div className="contacts">
        {contacts.map((contact, index) => {
              return (
                <div
                  
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key = {index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
               
               <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>

                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>

        </div>
        
        );
        })}
        </div>

        <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>

</>
        
         
         )}




    </div>
            </>
           
  );
}