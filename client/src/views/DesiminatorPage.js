import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Pages.css";

const API_URL = "http://localhost:5000/api/desiminators";

const DesiminatorPage = () => {
  const [desiminators, setDesiminators] = useState([]);
  const [formData, setFormData] = useState({
    emri: "",
    mbiemri: "",
    email: "",
    nrTel: "",
    qyteti: "",
    password: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDesiminators();
  }, []);

  const fetchDesiminators = async () => {
    const res = await axios.get(API_URL);
    setDesiminators(res.data);
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
      setFormData({
        emri: "",
        mbiemri: "",
        email: "",
        nrTel: "",
        qyteti: "",
        password: "",
      });
      setEditingId(null);
      fetchDesiminators();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleEdit = (desiminator) => {
    setEditingId(desiminator.id);
    setFormData({ ...desiminator, password: "" });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchDesiminators();
  };

  return (
    <div className="container">
      <div className="sidebar">
        <img src="staff-logo.png" alt="Logo" className="logo-img" />
        <h3 className="title">Staff</h3>
        <nav>
          <Link to="/mentors">Mentorët</Link>
          <Link to="/desiminators" className="active">Desiminatorët</Link>
          <Link to="/vullnetare">Vullnetarët</Link>
        </nav>
      </div>

      <div className="main-content">
        <h2>{editingId ? "Edit Desiminator" : "Add Desiminator"}</h2>
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

        <h3 className="text-xl font-semibold mb-2">Desiminators List</h3>
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
            {desiminators.map((desiminator) => (
              <tr key={desiminator.id}>
                <td>{desiminator.emri}</td>
                <td>{desiminator.mbiemri}</td>
                <td>{desiminator.email}</td>
                <td>{desiminator.nrTel}</td>
                <td>{desiminator.qyteti}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(desiminator)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(desiminator.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DesiminatorPage;
