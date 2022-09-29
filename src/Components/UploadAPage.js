import React from "react";
import UploadA from "./UploadA";
import Sidebar from "./Sidebar";
import "./UploadAPage.css";
function UploadAPage({ currentUser, signOut }) {
  return (
    <div className="chatpage">
      <div className="chatpage-container">
        {/* sidebar */}
        <Sidebar currentUser={currentUser} signOut={signOut} />

        {/* chat container */}
        <UploadA />
      </div>
    </div>
  );
}

export default UploadAPage;
