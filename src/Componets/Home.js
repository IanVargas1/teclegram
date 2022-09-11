import React from "react";
import Sidebar from "./Sidebar";
import './Home.css'
function Home() {
  return <div className="home">
    <div className="home-container">
      {/* SideBar */}
       <Sidebar />
    </div>
  </div>;
}

export default Home;
