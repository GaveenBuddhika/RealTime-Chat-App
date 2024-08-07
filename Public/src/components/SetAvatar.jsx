import React, { useEffect, useState } from "react";
import "../styles/SetAvatar.css";
import axios from "axios";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";

export const SetAvatar = () => {
  const api = "https://api.multiavatar.com/4645646";
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

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, []);
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem("user")
      );
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar], });
    
  console.log(data);

  if (data.isSet) {
    user.isAvatarImageSet = true;
    user.avatarImage = data.image;
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );
    navigate("/");
  } else {
    toast.error("Error setting avatar. Please try again.", toastOptions);
  }
}};

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

