import React from "react";
import UploadV from "./UploadV";
import Sidebar from "./Sidebar";
import "./UploadVPage.css";
function UploadVPage({ currentUser, signOut }) {
  return (
    <div className="chatpage">
      <div className="chatpage-container">
        {/* sidebar */}
        <Sidebar currentUser={currentUser} signOut={signOut} />

        {/* chat container */}
        <UploadV />
      </div>
    </div>
  );
}

export default UploadVPage;
