const Sequelize = require("sequelize");
const sequelize = require("../config/db");

// Import models
const MentorModel = require("./Mentor");
const VullnetarModel = require("./Vullnetar");
const DesiminatorModel = require("./Desiminator");

// Initialize models with Sequelize instance
const Mentor = MentorModel(sequelize);
const Vullnetar = VullnetarModel(sequelize);
const Desiminator = DesiminatorModel(sequelize);

// If you plan to define associations, do it here:
// Mentor.hasMany(...), etc.

// Export all models and sequelize instance
module.exports = {
  sequelize,
  Sequelize,
  Mentor,
  Vullnetar,
  Desiminator,
};
