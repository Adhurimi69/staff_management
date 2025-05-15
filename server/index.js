const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const Mentor = require("./models/Mentor")(sequelize); // ✅ Register the model

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const mentorRoutes = require("./routes/mentorRoutes");
app.use("/api/mentors", mentorRoutes); // or "/mentor"

sequelize.sync({ alter: true }) // ✅ alter:true to update schema without dropping
  .then(() => {
    console.log("✅ Database synced");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ DB connection error:", err));
