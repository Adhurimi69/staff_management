const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const Mentor = sequelize.define("Mentor", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    emri: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mbiemri: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    nrTel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qyteti: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Mentor.beforeCreate(async (mentor) => {
    if (mentor.password) {
      const saltRounds = 10;
      mentor.password = await bcrypt.hash(mentor.password, saltRounds);
    }
  });

  Mentor.beforeUpdate(async (mentor) => {
    if (mentor.changed("password")) {
      const saltRounds = 10;
      mentor.password = await bcrypt.hash(mentor.password, saltRounds);
    }
  });

  return Mentor;
};
