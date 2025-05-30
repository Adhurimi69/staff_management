import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Pages.css";

const API_URL = "http://localhost:5000/api/mentors";

const ToastError = ({ message, onClose }) => {
  React.useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => onClose(), 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return <div className="toast-error">{message}</div>;
};

const MentorsPage = () => {
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

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedMentorId, setSelectedMentorId] = useState(null);

  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const res = await axios.get(API_URL);
      setMentors(res.data);
    } catch (err) {
      console.error(err);
      setToastMessage("Gabim gjatë marrjes së mentorëve.");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    if (!/^[A-Za-z]{1,30}$/.test(formData.emri)) {
      return "Emri duhet të përmbajë vetëm shkronja!";
    }
    if (!/^[A-Za-z]{1,30}$/.test(formData.mbiemri)) {
      return "Mbiemri duhet të përmbajë vetëm shkronja!";
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      return "Emaili nuk është valid.";
    }
    if (formData.qyteti && !/^[A-Za-z ]{1,50}$/.test(formData.qyteti)) {
      return "Qyteti duhet të përmbajë vetëm shkronja!";
    }
    if (formData.nrTel && !/^\+?\d+$/.test(formData.nrTel)) {
      return "Numri Telefonit duhet të përmbajë vetëm numra!";
    }

    if (!editingId) {
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,12}$/.test(formData.password)) {
        return "Passwordi duhet të jetë 5-12 karaktere dhe të përmbajë shkronja dhe numra.";
      }
    } else {
      if (formData.password && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,12}$/.test(formData.password)) {
        return "Passwordi duhet të jetë 5-12 karaktere dhe të përmbajë shkronja dhe numra.";
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setToastMessage(validationError);
      return;
    }

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
      setToastMessage("Gabim gjatë ruajtjes së të dhënave.");
    }
  };

  const handleEdit = (mentor) => {
    setEditingId(mentor.id);
    setFormData({ ...mentor, password: "" });
  };

  const confirmDelete = (id) => {
    setSelectedMentorId(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${selectedMentorId}`);
      fetchMentors();
    } catch (err) {
      console.error("Gabim gjatë fshirjes:", err);
      setToastMessage("Gabim gjatë fshirjes së mentorit.");
    } finally {
      setShowConfirm(false);
      setSelectedMentorId(null);
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <img src="/blue_staff.png" alt="Logo" className="logo-img" />
        <h3 className="title">Staff</h3>
        <nav>
          <Link to="/staff">Staff</Link>
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

        <h3 className="text-xl font-semibold mb-2">Mentorët List</h3>
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
                  <button className="delete-btn" onClick={() => confirmDelete(mentor.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p className="modal-text">A je i sigurtë që dëshiron të fshish këtë mentor?</p>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleConfirmDelete}>Po, fshije</button>
              <button className="cancel-btn" onClick={() => setShowConfirm(false)}>Anulo</button>
            </div>
          </div>
        </div>
      )}

      <ToastError message={toastMessage} onClose={() => setToastMessage("")} />
    </div>
  );
};

export default MentorsPage;
