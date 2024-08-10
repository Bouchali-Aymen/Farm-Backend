const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./connection");
const sheep = require("../models/sheep");

const breed = sequelize.define(
  "breed",
  {
    رقم_السلالة: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    اسم_السلالة: {
      type: DataTypes.STRING,
    },
    عدد_الأغنام: {
      type: DataTypes.INTEGER,
    },
  },

  {
    tableName: "السلالات",
    timestamps: false,
  }
);


module.exports = breed;
