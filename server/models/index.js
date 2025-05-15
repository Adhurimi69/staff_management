const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const MentorModel = require("./Mentor");

const Mentor = MentorModel(sequelize); // Initialize model

// Export initialized models
module.exports = {
  sequelize,
  Sequelize,
  Mentor,
};
