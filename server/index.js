// index.js
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

const MentorModel = require("./models/Mentoret");
const mentorRoutes = require("./routes/mentorRoutes");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Load Mentor model
const Mentoret = MentorModel(sequelize);

// Routes
app.use("/api", mentorRoutes(Mentoret));

// Sync DB and start server
sequelize.sync()
  .then(() => {
    console.log("✅ Database synced");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ DB connection error:", err));
