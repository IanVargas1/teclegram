import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import ChatPage from "./Components/ChatPage";
import { useState } from "react";
import Login from "./Components/Login";
function App() {
  /** routing for the pages */
  const[user, setUser] = useState();
  return (
    <Router>
      <div className="App">
        {user ? (
          <Routes>
            <Route path="/chatpage" element={<ChatPage />} />
            <Route path="/" element={<Home />} />
          </Routes>
        ) : (
          <Login setUser={setUser}/>
        )}
      </div>
    </Router>
  );
}

export default App;
