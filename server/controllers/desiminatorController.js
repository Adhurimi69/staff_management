const { Desiminator } = require("../models"); // ✅ Correct way

// Create new desiminator
exports.createDesiminator = async (req, res) => {
  try {
    const { emri, mbiemri, email, nrTel, qyteti, password } = req.body;

    if (!emri || !mbiemri || !email || !password) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newDesiminator = await Desiminator.create({
      emri,
      mbiemri,
      email,
      nrTel,
      qyteti,
      password,
    });

    const { password: _, ...desiminatorData } = newDesiminator.toJSON();
    res.status(201).json(desiminatorData);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Email already in use." });
    }

    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Get all desiminators
exports.getAllDesiminators = async (req, res) => {
  try {
    const desiminators = await Desiminator.findAll({
      attributes: { exclude: ["password"] },
    });

    res.json(desiminators);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Get desiminator by ID
exports.getDesiminatorById = async (req, res) => {
  try {
    const desiminator = await Desiminator.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    if (!desiminator) return res.status(404).json({ message: "Desiminator not found." });
    res.json(desiminator);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Update desiminator by ID
exports.updateDesiminator = async (req, res) => {
  try {
    const { emri, mbiemri, email, nrTel, qyteti, password } = req.body;

    const desiminator = await Desiminator.findByPk(req.params.id);
    if (!desiminator) return res.status(404).json({ message: "Desiminator not found." });

    if (emri !== undefined) desiminator.emri = emri;
    if (mbiemri !== undefined) desiminator.mbiemri = mbiemri;
    if (email !== undefined) desiminator.email = email;
    if (nrTel !== undefined) desiminator.nrTel = nrTel;
    if (qyteti !== undefined) desiminator.qyteti = qyteti;
    if (password !== undefined) desiminator.password = password;

    await desiminator.save();

    const { password: _, ...desiminatorData } = desiminator.toJSON();
    res.json(desiminatorData);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Email already in use." });
    }

    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Delete desiminator by ID
exports.deleteDesiminator = async (req, res) => {
  try {
    const deleted = await Desiminator.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) return res.status(404).json({ message: "Desiminator not found." });

    res.json({ message: "Desiminator deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
