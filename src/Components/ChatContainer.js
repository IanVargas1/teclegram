import React, { useEffect, useState } from "react";
import "./ChatContainer.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ChatMessage from "./ChatMessage";
import Picker from "emoji-picker-react";
import { useParams } from "react-router-dom";
import db from "../firebase";

function ChatContainer() {
  const [message, setMessage] = useState("");
  const [openEmojiBox, setOpenemojiBox] = useState(false);
  const { emailID } = useParams();
  console.log("asd", emailID);
  useEffect(() => {
    const getUser = async () => {
      const data = await db
        .collection("users")
        .doc(emailID)
        .onSnapshot((snapshot) => {
          console.log(snapshot.data());
        });
    };
  }, []);
  return (
    <div className="chat-container">
      <div className="chat-container-header">
        <div className="chat-user-info">
          <div className="chat-user-img">
            <img src="./user.png" alt="" />
          </div>
          <p>ian</p>
        </div>
        <div className="chat-container-header-btn">
          <MoreVertIcon />
        </div>
      </div>
      {/* chat display container */}
      <div className="chat-display-container">
        <ChatMessage message="hello, how are you?" time="17-9-2022" />
        <ChatMessage message="hello, how are you?" time="17-9-2022" />
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
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
        {/* send message button */}
        <div className="chat-input-send-btn">
          <SendIcon />
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
