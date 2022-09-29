import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import "./Sidebar.css";
import UserProfile from "./UserProfile";
import db from "../firebase";
import { Button } from "@mui/material";

function Sidebar({ currentUser, signOut }) {
  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [friendList, setFriendList] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const data = await db.collection("users").onSnapshot((snapshot) => {
        setAllUsers(
          snapshot.docs.filter((doc) => doc.data().email !== currentUser?.email)
        );
      });
    };

    const getFriends = async () => {
      const data = await db
        .collection("FriendList")
        .doc(currentUser.email)
        .collection("list")
        .onSnapshot((snapshot) => {
          setFriendList(snapshot.docs);
        });
    };
    getAllUsers();
    getFriends();
  }, []);

  const searchedUser = allUsers.filter((user) => {
    if (searchInput) {
      if (
        user.data().fullname.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return user;
      }
    }
  });

  const searchItem = searchedUser.map((user) => {
    return (
      <UserProfile
        name={user.data().fullname}
        photoURL={user.data().photoURL}
        key={user.id}
        email={user.data().email}
      />
    );
  });

  function ocultar() {
    var x = document.getElementById("menu-side");
    if (x.style.display === "none") {
      x.style.display = "flex";
    } else {
      x.style.display = "none";
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-img" onClick={signOut}>
          <img src={currentUser.photoURL} alt="" />
        </div>

        <div className="sidebar-header-btn">
          <Button id="btn" onClick={ocultar}>
            <MoreVertIcon />
          </Button>
        </div>
      </div>
      <div id="menu-side" class="menu-side" style={{ display: "none" }}>
        <a class="link" href="#">
          Estadisticas
        </a>
        <a class="link" href="#">
          Tiempo y Clima
        </a>
        <a class="link" href="#">
          Wikipedia
        </a>
        <a class="link" href="/calendario">
          Calendario
        </a>
      </div>
      <div className="sidebar-search">
        <div className="sidebar-search-input">
          <SearchIcon />
          <input
            type="text"
            name="search"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      <div className="sidebar-chat-list">
        {searchItem.length > 0
          ? searchItem
          : friendList.map((friend) => (
              <UserProfile
                name={friend.data().fullname}
                photoURL={friend.data().photoURL}
                lastMessage={friend.data().lastMessage}
                email={friend.data().email}
              />
            ))}
      </div>
    </div>
  );
}

export default Sidebar;
