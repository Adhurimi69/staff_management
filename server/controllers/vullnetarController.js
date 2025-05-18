const { Vullnetar } = require("../models"); // ✅ Correct way

// Create new vullnetar
exports.createVullnetar = async (req, res) => {
  try {
    const { emri, mbiemri, email, nrTel, qyteti, password } = req.body;

    if (!emri || !mbiemri || !email || !password) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newVullnetar = await Vullnetar.create({
      emri,
      mbiemri,
      email,
      nrTel,
      qyteti,
      password,
    });

    const { password: _, ...vullnetarData } = newVullnetar.toJSON();
    res.status(201).json(vullnetarData);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Email already in use." });
    }
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Get all vullnetarë
exports.getAllVullnetare = async (req, res) => {
  try {
    const vullnetare = await Vullnetar.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(vullnetare);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Get vullnetar by ID
exports.getVullnetarById = async (req, res) => {
  try {
    const vullnetar = await Vullnetar.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    if (!vullnetar) return res.status(404).json({ message: "Vullnetar not found." });
    res.json(vullnetar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Update vullnetar by ID
exports.updateVullnetar = async (req, res) => {
  try {
    const { emri, mbiemri, email, nrTel, qyteti, password } = req.body;

    const vullnetar = await Vullnetar.findByPk(req.params.id);
    if (!vullnetar) return res.status(404).json({ message: "Vullnetar not found." });

    if (emri !== undefined) vullnetar.emri = emri;
    if (mbiemri !== undefined) vullnetar.mbiemri = mbiemri;
    if (email !== undefined) vullnetar.email = email;
    if (nrTel !== undefined) vullnetar.nrTel = nrTel;
    if (qyteti !== undefined) vullnetar.qyteti = qyteti;
    if (password !== undefined) vullnetar.password = password;

    await vullnetar.save();

    const { password: _, ...vullnetarData } = vullnetar.toJSON();
    res.json(vullnetarData);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Email already in use." });
    }
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Delete vullnetar by ID
exports.deleteVullnetar = async (req, res) => {
  try {
    const deleted = await Vullnetar.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) return res.status(404).json({ message: "Vullnetar not found." });
    res.json({ message: "Vullnetar deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
