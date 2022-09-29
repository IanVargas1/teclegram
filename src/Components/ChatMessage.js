import React from "react";
import db, { auth, deleteMessage } from "../firebase";
import "./ChatMessage.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
function ChatMessage({ id, message, time, sender, emailID }) {
  const deleteMessage = async () => {
    //* Delete from sender
    const data = await db
      .collection("chats")
      .doc(auth?.currentUser?.email)
      .collection("messages")
      .onSnapshot((snapshot) => {
        let doc1;
        snapshot.docs.map((doc) => {
          if (doc.data().id === id) {
            doc1 = doc;
          }
        });
        console.log("jaja -", doc1.id);
      });

    //* Delete from reciver
    const data2 = await db
      .collection("chats")
      .doc(emailID)
      .collection("messages")
      .onSnapshot((snapshot) => {
        let doc1;
        snapshot.docs.map((doc) => {
          if (doc.data().id === id) {
            doc1 = doc;
          }
        });
        console.log("jaja2 -", doc1.id);
      });
  };

  return (
    <div
      className="chat-message"
      style={{
        alignSelf:
          sender === auth?.currentUser?.email ? "flex-end" : "flex-start",

        backgroundColor:
          sender === auth?.currentUser?.email ? "#01f8fc" : "#ffb3e3",
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
