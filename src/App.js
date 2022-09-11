import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Componets/Home";
import ChatPage from "./Componets/ChatPage";
function App() {
  /** routing for the pages */
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/chatpage" element={<ChatPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
