import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import MentorPage from "./views/MentorPage";
import VullnetarPage from "./views/VullnetarPage";
import DesiminatorPage from "./views/DesiminatorPage"; // ✅ Import DesiminatorPage

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", backgroundColor: "#eee" }}>
        <Link to="/mentors" style={{ marginRight: "1rem" }}>
          Mentors
        </Link>
        <Link to="/desiminators" style={{ marginRight: "1rem" }}>
          Desiminators
        </Link>
        <Link to="/vullnetars" style={{ marginRight: "1rem" }}>
          Vullnetars
        </Link>  
        {/* Add more links here if needed */}
      </nav>

      <Routes>
        <Route path="/mentors" element={<MentorPage />} />
        <Route path="/desiminators" element={<DesiminatorPage />} /> {/* ✅ Route */}
        <Route path="/vullnetars" element={<VullnetarPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
