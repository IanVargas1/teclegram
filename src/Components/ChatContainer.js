import React, { useEffect, useRef, useState } from "react";
import "./ChatContainer.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ChatMessage from "./ChatMessage";
import Picker from "emoji-picker-react";
import { useParams } from "react-router-dom";
import db from "../firebase";
import firebase from "firebase";
import { v4 } from "uuid";

function ChatContainer({ currentUser }) {
  const [message, setMessage] = useState("");
  const [openEmojiBox, setOpenemojiBox] = useState(false);
  const { emailID } = useParams();
  const [chatUser, setChatUser] = useState({});
  const chatBox = useRef(null);
  const [chatMessages, setChatMessages] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const data = await db
        .collection("users")
        .doc(emailID)
        .onSnapshot((snapshot) => {
          setChatUser(snapshot.data());
        });
    };

    const getMessages = async () => {
      const data = await db
        .collection("chats")
        .doc(emailID)
        .collection("messages")
        .orderBy("timeStamp", "asc")
        .onSnapshot((snapshot) => {
          let messages = snapshot.docs.map((doc) => doc.data());
          let newMessage = messages.filter(
            (message) =>
              message.senderEmail === (currentUser.email || emailID) ||
              message.reciverEmail === (currentUser.email || emailID)
          );

          setChatMessages(newMessage);
        });
    };
    getUser();
    getMessages();
  }, [emailID]);

  useEffect(() => {
    chatBox.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
  }, [chatMessages]);

  //* function to send text messages and store them in the db
  const send = (e) => {
    e.preventDefault();
    if (emailID && !!message && message !== " ") {
      var cod = v4();
      let playload = {
        id: cod,
        text: message,
        senderEmail: currentUser.email,
        reciverEmail: emailID,
        timeStamp: firebase.firestore.Timestamp.now(),
      };
      //data to the sender
      db.collection("chats")
        .doc(currentUser.email)
        .collection("messages")
        .add(playload);

      //data to reciver
      db.collection("chats").doc(emailID).collection("messages").add(playload);

      db.collection("FriendList")
        .doc(currentUser.email)
        .collection("list")
        .doc(emailID)
        .set({
          email: chatUser.email,
          fullname: chatUser.fullname,
          photoURL: chatUser.photoURL,
          lastMessage: message,
        });

      db.collection("FriendList")
        .doc(emailID)
        .collection("list")
        .doc(currentUser.email)
        .set({
          email: currentUser.email,
          fullname: currentUser.fullname,
          photoURL: currentUser.photoURL,
          lastMessage: message,
        });

      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-container-header">
        <div className="chat-user-info">
          <div className="chat-user-img">
            <img src={chatUser?.photoURL} alt="" />
          </div>
          <p>{chatUser?.fullname}</p>
        </div>
        {/* <div className="chat-container-header-btn">
          <MoreVertIcon />
        </div> */}
      </div>
      {/* chat display container */}
      <div className="chat-display-container" ref={chatBox}>
        {chatMessages.map((message) => (
          <ChatMessage
            id={message.id}
            message={message.text}
            time={message.timeStamp}
            sender={message.senderEmail}
            emailID={emailID}
          />
        ))}
      </div>

      {/* chat input */}
      <div className="chat-input">
        {/* buttons */}
        {openEmojiBox && (
          <Picker
            onEmojiClick={(event, emojiObject) =>
              setMessage(message + emojiObject.emoji)
            }
          />
        )}

        <div className="chat-input-btn">
          <InsertEmoticonIcon onClick={() => setOpenemojiBox(!openEmojiBox)} />
          <AttachFileIcon />
        </div>

        {/* text input element */}
        <form onSubmit={send}>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value.trimStart())}
          />
        </form>
        {/* send message button */}
        <div className="chat-input-send-btn" onClick={send}>
          <SendIcon />
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
