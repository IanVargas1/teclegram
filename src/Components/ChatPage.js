import React from "react";
import ChatContainer from "./ChatContainer";
import Sidebar from "./Sidebar";
import "./ChatPage.css";
function ChatPage() {
  return (
    <div className="chatpage">
      <div className="chatpage-container">
        {/* sidebar */}
        <Sidebar />

        {/* chat container */}
        <ChatContainer />
      </div>
    </div>
  );
}

export default ChatPage;
