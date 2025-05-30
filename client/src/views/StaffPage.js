import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Pages.css";

const AllStaffPage = () => {
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [qytetiFilter, setQytetiFilter] = useState("all");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [volRes, menRes, desRes] = await Promise.all([
          axios.get("http://localhost:5000/api/vullnetars"),
          axios.get("http://localhost:5000/api/mentors"),
          axios.get("http://localhost:5000/api/desiminators"),
        ]);

        const volunteers = volRes.data.map((v) => ({ ...v, role: "Vullnetar" }));
        const mentors = menRes.data.map((m) => ({ ...m, role: "Mentor" }));
        const desiminators = desRes.data.map((d) => ({ ...d, role: "Desiminator" }));

        const allStaff = [...volunteers, ...mentors, ...desiminators];
        setStaff(allStaff);
        setFilteredStaff(allStaff);
      } catch (err) {
        console.error("Error fetching staff:", err);
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    let filtered = staff;

    if (roleFilter !== "all") {
      filtered = filtered.filter((person) => person.role === roleFilter);
    }

    if (qytetiFilter !== "all") {
      filtered = filtered.filter((person) => person.qyteti === qytetiFilter);
    }

    setFilteredStaff(filtered);
  }, [roleFilter, qytetiFilter, staff]);

  const uniqueCities = [...new Set(staff.map((p) => p.qyteti).filter(Boolean))];

  return (
    <div className="container">
      <div className="sidebar">
        <img src="/blue_staff.png" alt="Logo" className="logo-img" />
        <h3 className="title">Staff</h3>
        <nav>
          <Link to="/staff" className="active">Staff</Link>
          <Link to="/mentors">Mentorët</Link>
          <Link to="/desiminators">Desiminatorët</Link>
          <Link to="/vullnetare">Vullnetarët</Link>
        </nav>
      </div>

      <div className="main-content">
        <h2 className="text-2xl font-bold mb-4">Të Gjithë Anëtarët e Staff-it</h2>

        <div className="filter-container">
          <div>
            <label htmlFor="roleFilter">Filtro sipas rolit:</label>
            <select
              id="roleFilter"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">Të Gjithë</option>
              <option value="Vullnetar">Vullnetar</option>
              <option value="Mentor">Mentor</option>
              <option value="Desiminator">Desiminator</option>
            </select>
          </div>

          <div>
            <label htmlFor="qytetiFilter">Filtro sipas qytetit:</label>
            <select
              id="qytetiFilter"
              value={qytetiFilter}
              onChange={(e) => setQytetiFilter(e.target.value)}
            >
              <option value="all">Të Gjithë</option>
              {uniqueCities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        <table className="w-full border border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Emri</th>
              <th className="border p-2">Mbiemri</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Nr. Tel</th>
              <th className="border p-2">Qyteti</th>
              <th className="border p-2">Roli</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.length > 0 ? (
              filteredStaff.map((person, index) => (
                <tr key={index}>
                  <td className="border p-2">{person.emri || "—"}</td>
                  <td className="border p-2">{person.mbiemri || "—"}</td>
                  <td className="border p-2">{person.email || "—"}</td>
                  <td className="border p-2">{person.nrTel || "—"}</td>
                  <td className="border p-2">{person.qyteti || "—"}</td>
                  <td className="border p-2">{person.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border p-2 text-center" colSpan="6">Nuk ka të dhëna</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllStaffPage;
