const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const Vullnetar = sequelize.define("Vullnetar", {
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

  Vullnetar.beforeCreate(async (vullnetar) => {
    if (vullnetar.password) {
      const saltRounds = 10;
      vullnetar.password = await bcrypt.hash(vullnetar.password, saltRounds);
    }
  });

  Vullnetar.beforeUpdate(async (vullnetar) => {
    if (vullnetar.changed("password")) {
      const saltRounds = 10;
      vullnetar.password = await bcrypt.hash(vullnetar.password, saltRounds);
    }
  });

  return Vullnetar;
};
