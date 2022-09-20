import React from "react";
import Sidebar from "./Sidebar";
import './Home.css'
function Home() {
  return <div className="home">
    <div className="home-container">
      {/* SideBar */}
       <Sidebar />
       {/* Application logo */}
       <div className="home-bg">
        <img src="./login.png" alt="" />
       </div>
    </div>
  </div>;
}

export default Home;
