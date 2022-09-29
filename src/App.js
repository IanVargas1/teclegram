import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";

import UploadPage from "./Components/UploadPage";
import ChatPage from "./Components/ChatPage";
import { useState } from "react";
import Login from "./Components/Login";
import { auth } from "./firebase";
import CalendarContainer from "./Components/CalendarContainer";
function App() {
  /** routing for the pages */
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
      })
      .catch((err) => alert(err.message));
  };
  return (
    <Router>
      <div className="App">
        {user ? (
          <Routes>
            <Route
              path="/:emailID"
              element={<ChatPage currentUser={user} signOut={signOut} />}
            />
            <Route
              path="/"
              element={<Home currentUser={user} signOut={signOut} />}
            />
            <Route
              path="/upload/:emailID"
              element={<UploadPage currentUser={user} signOut={signOut} />}
            />
            <Route
              path="/calendario"
              element={
                <CalendarContainer currentUser={user} signOut={signOut} />
              }
            />
          </Routes>
        ) : (
          <Login setUser={setUser} />
        )}
      </div>
    </Router>
  );
}

export default App;
