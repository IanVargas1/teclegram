import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Componets/Home";
import ChatPage from "./Componets/ChatPage";
import { useState } from "react";
import Login from "./Componets/Login";
function App() {
  /** routing for the pages */
  const[user, setuser] = useState();
  return (
    <Router>
      <div className="App">
        {user ? (
          <Routes>
            <Route path="/chatpage" element={<ChatPage />} />
            <Route path="/" element={<Home />} />
          </Routes>
        ) : (
          <Login />
        )}
      </div>
    </Router>
  );
}

export default App;
