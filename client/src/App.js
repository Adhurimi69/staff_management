import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MentorPage from "./views/MentorPage";

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", backgroundColor: "#eee" }}>
        <Link to="/mentors" style={{ marginRight: "1rem" }}>
          Mentors
        </Link>
        {/* Add more links here if you want */}
      </nav>
      <Routes>
        <Route path="/mentors" element={<MentorPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
