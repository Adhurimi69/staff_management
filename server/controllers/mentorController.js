const { Mentor } = require("../models"); // ✅ Correct way

// Create new mentor
exports.createMentor = async (req, res) => {
  try {
    const { emri, mbiemri, email, nrTel, qyteti, password } = req.body;

    if (!emri || !mbiemri || !email || !password) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newMentor = await Mentor.create({
      emri,
      mbiemri,
      email,
      nrTel,
      qyteti,
      password,
    });

    const { password: _, ...mentorData } = newMentor.toJSON();
    res.status(201).json(mentorData);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Email already in use." });
    }
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Get all mentors
exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(mentors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Get mentor by ID
exports.getMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    if (!mentor) return res.status(404).json({ message: "Mentor not found." });
    res.json(mentor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Update mentor by ID
exports.updateMentor = async (req, res) => {
  try {
    const { emri, mbiemri, email, nrTel, qyteti, password } = req.body;

    const mentor = await Mentor.findByPk(req.params.id);
    if (!mentor) return res.status(404).json({ message: "Mentor not found." });

    if (emri !== undefined) mentor.emri = emri;
    if (mbiemri !== undefined) mentor.mbiemri = mbiemri;
    if (email !== undefined) mentor.email = email;
    if (nrTel !== undefined) mentor.nrTel = nrTel;
    if (qyteti !== undefined) mentor.qyteti = qyteti;
    if (password !== undefined) mentor.password = password;

    await mentor.save();

    const { password: _, ...mentorData } = mentor.toJSON();
    res.json(mentorData);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Email already in use." });
    }
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Delete mentor by ID
exports.deleteMentor = async (req, res) => {
  try {
    const deleted = await Mentor.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) return res.status(404).json({ message: "Mentor not found." });
    res.json({ message: "Mentor deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
