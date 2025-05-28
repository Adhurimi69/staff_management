// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MentorPage from "./views/MentorPage";
import DesiminatorPage from "./views/DesiminatorPage";
import VullnetarPage from "./views/VullnetarPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MentorPage />} />
        <Route path="/mentors" element={<MentorPage />} />
        <Route path="/desiminators" element={<DesiminatorPage />} />
        <Route path="/vullnetare" element={<VullnetarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
