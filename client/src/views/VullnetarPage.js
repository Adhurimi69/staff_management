import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Pages.css";

const API_URL = "http://localhost:5000/api/vullnetars";

const VullnetarPage = () => {
  const [vullnetare, setVullnetars] = useState([]);
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
    fetchVullnetars();
  }, []);

  const fetchVullnetars = async () => {
    const res = await axios.get(API_URL);
    setVullnetars(res.data);
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
      fetchVullnetars();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleEdit = (vullnetar) => {
    setEditingId(vullnetar.id);
    setFormData({ ...vullnetar, password: "" });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchVullnetars();
  };

  return (
    <div className="container">
      <div className="sidebar">
        <img src="staff-logo.png" alt="Logo" className="logo-img" />
        <h3 className="title">Staff</h3>
        <nav>          
          <Link to="/mentors">Mentorët</Link>
          <Link to="/desiminators">Desiminatorët</Link>
          <Link to="/vullnetare" className="active">Vullnetarët</Link>
        </nav>
      </div>

      <div className="main-content">
        <h2>{editingId ? "Edit Vullnetar" : "Add Vullnetar"}</h2>
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

        <h3 className="text-xl font-semibold mb-2">Vullnetarë List</h3>
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
            {vullnetare.map((vullnetar) => (
              <tr key={vullnetar.id}>
                <td>{vullnetar.emri}</td>
                <td>{vullnetar.mbiemri}</td>
                <td>{vullnetar.email}</td>
                <td>{vullnetar.nrTel}</td>
                <td>{vullnetar.qyteti}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(vullnetar)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(vullnetar.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VullnetarPage;
