const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./connection");
const sheep = require("../models/sheep");


const chambers = sequelize.define(
  "chambers",
  {
    رقم_الغرفة: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    اسم_الغرفة: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    عدد_الأغنام: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "غرف_الأغنام",
    timestamps: false,
  }
);




module.exports = chambers;
