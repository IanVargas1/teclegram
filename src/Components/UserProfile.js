import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

function UserProfile({ name, photoURL, email, lastMessage }) {
  const navigate = useNavigate();
  const goToUser = (emailId) => {
    if (emailId) {
      navigate(`/${emailId}`);
    }
  };
  return (
    <div className="user-profile" onClick={()=> goToUser(email)}>
      {/* user image */}
      <div className="user-image">
        <img src={photoURL} alt="" />
      </div>
      {/* user name */}
      <div className="user-info">
        <p className="user-name">{name}</p>
        {/* {lastMessage && (<p className="user-last-message">{lastMessage}</p>)} */}
      </div>
    </div>
  );
}

export default UserProfile;
