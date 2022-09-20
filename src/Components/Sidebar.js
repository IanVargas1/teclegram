import React from "react";
import TollIcon from "@mui/icons-material/Toll";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import "./Sidebar.css";
import UserProfile from "./UserProfile";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-img">
          <img src="./user.png" alt="" />
        </div>
        <div className="sidebar-header-btn">
          <TollIcon />
          <ChatIcon />
          <MoreVertIcon />
        </div>
      </div>
      <div className="sidebar-search">
        <div className="sidebar-search-input">
          <SearchIcon />
          <input type="text" name="search" placeholder="Search..." />
        </div>
      </div>
      <div className="sidebar-chat-list">
        <UserProfile name="JeanK" photoURL="./user.png" />
        <UserProfile name="Julio lopez" photoURL="./user.png" />
        <UserProfile name="Ian Vargas" photoURL="./user.png" />
        <UserProfile name="Naraku" photoURL="./user.png" />
        <UserProfile name="jarol" photoURL="./user.png" />
        <UserProfile name="brincolin" photoURL="./user.png" />
        <UserProfile name="Julio lopez" photoURL="./user.png" />
        <UserProfile name="Ian Vargas" photoURL="./user.png" />
        <UserProfile name="Naraku" photoURL="./user.png" />
        <UserProfile name="jarol" photoURL="./user.png" />
        <UserProfile name="brincolin" photoURL="./user.png" />
        <UserProfile name="Julio lopez" photoURL="./user.png" />
        <UserProfile name="Ian Vargas" photoURL="./user.png" />
        <UserProfile name="Naraku" photoURL="./user.png" />
        <UserProfile name="jarol" photoURL="./user.png" />
        <UserProfile name="brincolin" photoURL="./user.png" />
        <UserProfile name="Julio lopez" photoURL="./user.png" />
        <UserProfile name="Ian Vargas" photoURL="./user.png" />
        <UserProfile name="Naraku" photoURL="./user.png" />
        <UserProfile name="jarol" photoURL="./user.png" />
        <UserProfile name="brincolin" photoURL="./user.png" />
      </div>
    </div>
  );
}

export default Sidebar;
