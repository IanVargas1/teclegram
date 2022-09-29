import React from "react";
import Upload from "./Upload";
import Sidebar from "./Sidebar";
import "./UploadPage.css";
function UploadPage({ currentUser, signOut }) {
  return (
    <div className="chatpage">
      <div className="chatpage-container">
        {/* sidebar */}
        <Sidebar currentUser={currentUser} signOut={signOut} />

        {/* chat container */}
        <Upload />
      </div>
    </div>
  );
}

export default UploadPage;
