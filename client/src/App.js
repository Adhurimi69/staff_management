import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MentorPage from "./views/MentorPage";
import VullnetarPage from "./views/VullnetarPage"; // ✅ Import VullnetarPage

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", backgroundColor: "#eee" }}>
        <Link to="/mentors" style={{ marginRight: "1rem" }}>
          Mentors
        </Link>
        <Link to="/vullnetare">
          Vullnetarë
        </Link>
      </nav>

      <Routes>
        <Route path="/mentors" element={<MentorPage />} />
        <Route path="/vullnetare" element={<VullnetarPage />} /> {/* ✅ Add this */}
      </Routes>
    </Router>
  );
}

export default App;
