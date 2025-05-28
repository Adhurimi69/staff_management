import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Pages.css";

const API_URL = "http://localhost:5000/api/mentors"; // Adjust if your base path is different

const MentorPage = () => {
  const [mentors, setMentors] = useState([]);
  const [formData, setFormData] = useState({
    emri: "",
    mbiemri: "",
    email: "",
    nrTel: "",
    qyteti: "",
    password: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch mentors on load
  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    const res = await axios.get(API_URL);
    setMentors(res.data);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({ emri: "", mbiemri: "", email: "", nrTel: "", qyteti: "", password: "" });
      setEditingId(null);
      fetchMentors();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleEdit = (mentor) => {
    setEditingId(mentor.id);
    setFormData({ ...mentor, password: "" }); // Don't preload password
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchMentors();
  };

  return (
  <div className="container">
    <div className="sidebar">
      <img src="staff-logo.png" alt="Logo" className="logo-img" />
      <h3 className="title">Staff</h3>
      <nav>
        <Link to="/mentors" className="active">Mentorët</Link>
        <Link to="/desiminators">Desiminatorët</Link>
        <Link to="/vullnetare">Vullnetarët</Link>
      </nav>

    </div>

    <div className="main-content">
      <h2>{editingId ? "Edit Mentor" : "Add Mentor"}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        <input name="emri" placeholder="Emri" value={formData.emri} onChange={handleChange} required />
        <input name="mbiemri" placeholder="Mbiemri" value={formData.mbiemri} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="nrTel" placeholder="Nr. Tel" value={formData.nrTel} onChange={handleChange} />
        <input name="qyteti" placeholder="Qyteti" value={formData.qyteti} onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required={!editingId}
        />
        <button type="submit" className="col-span-2">
          {editingId ? "Update" : "Create"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Mentors List</h3>
      <table>
        <thead>
          <tr>
            <th>Emri</th>
            <th>Mbiemri</th>
            <th>Email</th>
            <th>Nr. Tel</th>
            <th>Qyteti</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mentors.map((mentor) => (
            <tr key={mentor.id}>
              <td>{mentor.emri}</td>
              <td>{mentor.mbiemri}</td>
              <td>{mentor.email}</td>
              <td>{mentor.nrTel}</td>
              <td>{mentor.qyteti}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(mentor)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(mentor.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

};

export default MentorPage;
