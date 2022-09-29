import React from "react";
import db, { auth, deleteMessage } from "../firebase";
import "./ChatMessage.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
function ChatMessage({ id, message, time, sender, emailID }) {
  const [doc1, setDoc1] = useState("");
  const [doc2, setDoc2] = useState("");
  const deleteMessage = async () => {
    //* Delete from sender
    if (window.confirm("Estas seguro que deseas eliminar el mensaje?")) {
      const data = await db
        .collection("chats")
        .doc(auth?.currentUser?.email)
        .collection("messages")
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            if (doc.data().id === id) {
              deleteDoc(doc, auth?.currentUser?.email);
            }
          });
        });

      //* Delete from reciver
      const data2 = await db
        .collection("chats")
        .doc(emailID)
        .collection("messages")
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            if (doc.data().id === id) {
              deleteDoc(doc, emailID);
            }
          });
        });
    }
  };
  const deleteDoc = async (doc, email) => {
    await db
      .collection("chats")
      .doc(email)
      .collection("messages")
      .doc(doc.id)
      .delete();
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
