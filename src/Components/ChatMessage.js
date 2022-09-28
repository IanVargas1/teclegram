import React from "react";
import db, { auth, deleteMessage } from "../firebase";
import "./ChatMessage.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
function ChatMessage({ id, message, time, sender, emailID }) {
  const deleteMessage = (e) => {
    // e.preventDefault();
    // console.log("email: ", emailID, auth?.currentUser?.email);
    // console.log('cont mensaje:', message, time, sender);
    console.log(
      "hola >",
      db.collection("chats").doc(auth?.currentUser?.email)
      .collection("messages").onSnapshot((snapshot)=>snapshot.data())
      .doc.data().id
    );
    // deleteMessage(id);
  };

  return (
    <div
      className="chat-message"
      style={{
        alignSelf:
          sender === auth?.currentUser?.email ? "flex-end" : "flex-start",

        backgroundColor:
          sender === auth?.currentUser?.email ? "#00d7dc" : "#fff",
      }}
    >
      <div
        className="img"
        onClick={deleteMessage}
        style={{
          display: sender === auth?.currentUser?.email ? "flex" : "none",
          marginBottom: "-5px",
        }}
      >
        <DeleteIcon />
        {/* <EditIcon className="edit"/> */}
      </div>
      <div
        className="chat-message-text"
        style={{
          marginTop: sender === auth?.currentUser?.email ? "-10px" : "",
        }}
      >
        <p>{message}</p>
      </div>
      <div className="chat-message-date">
        <p>{new Date(time.toDate()).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default ChatMessage;
