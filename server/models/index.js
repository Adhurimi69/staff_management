const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const MentorModel = require("./Mentor");
const VullnetarModel = require("./Vullnetar");

const Mentor = MentorModel(sequelize); // Initialize model
const Vullnetar = VullnetarModel(sequelize); // Initialize model

// Export initialized models
module.exports = {
  sequelize,
  Sequelize,
  Mentor,
  Vullnetar
};
