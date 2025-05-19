const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const Desiminator = sequelize.define("Desiminator", {
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

  Desiminator.beforeCreate(async (desiminator) => {
    if (desiminator.password) {
      const saltRounds = 10;
      desiminator.password = await bcrypt.hash(desiminator.password, saltRounds);
    }
  });

  Desiminator.beforeUpdate(async (desiminator) => {
    if (desiminator.changed("password")) {
      const saltRounds = 10;
      desiminator.password = await bcrypt.hash(desiminator.password, saltRounds);
    }
  });

  return Desiminator;
};
