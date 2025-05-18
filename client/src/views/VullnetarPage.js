import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/vullnetare";

const VullnetarPage = () => {
  const [vullnetare, setVullnetare] = useState([]);
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
    fetchVullnetare();
  }, []);

  const fetchVullnetare = async () => {
    const res = await axios.get(API_URL);
    setVullnetare(res.data);
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
      fetchVullnetare();
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
    fetchVullnetare();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{editingId ? "Edit Vullnetar" : "Add Vullnetar"}</h2>
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
        <button type="submit" className="col-span-2 bg-blue-500 text-white py-2 rounded">
          {editingId ? "Update" : "Create"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Vullnetarë List</h3>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">Emri</th>
            <th className="border px-3 py-2">Mbiemri</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Nr. Tel</th>
            <th className="border px-3 py-2">Qyteti</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vullnetare.map((vullnetar) => (
            <tr key={vullnetar.id}>
              <td className="border px-3 py-1">{vullnetar.emri}</td>
              <td className="border px-3 py-1">{vullnetar.mbiemri}</td>
              <td className="border px-3 py-1">{vullnetar.email}</td>
              <td className="border px-3 py-1">{vullnetar.nrTel}</td>
              <td className="border px-3 py-1">{vullnetar.qyteti}</td>
              <td className="border px-3 py-1 space-x-2">
                <button
                  className="bg-yellow-400 px-2 py-1 rounded"
                  onClick={() => handleEdit(vullnetar)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(vullnetar.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VullnetarPage;
