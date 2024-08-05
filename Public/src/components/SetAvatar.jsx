import React, { useEffect, useState } from "react";
import "../styles/SetAvatar.css";
import axios from "axios";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";

export const SetAvatar = () => {
  const api = "https://api.multiavatar.com/4567895";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      // Your logic to save the selected avatar
    }
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
        const buffer = btoa(image.data);
        data.push(buffer);
      }
      setAvatars(data);
      setIsLoading(false);
    };
    fetchAvatars();
  }, []);

  return (
    <>
      <div className="container">
        <div className="title-container">
          <h1>Pick an Avatar as your profile picture</h1>
        </div>
        {isLoading ? (
          <img src={loader} alt="loader" className="loader" />
        ) : (
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
        )}
        <button onClick={setProfilePicture} className="submit-btn">
          Set as Profile Picture
        </button>
        <ToastContainer />
      </div>
    </>
  );
};

export default SetAvatar;

