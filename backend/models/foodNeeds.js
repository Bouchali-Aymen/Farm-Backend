
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./connection");

const foodNeeds = sequelize.define("foodNeeds", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mthode_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  المقدار_الجاف: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  الالياف_الخام: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  البروتين: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  الكالسيوم: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  الفسفور: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  المغنيزيوم: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  علف: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: "الاحتياج_الغذائي",
  timestamps: false,
});

module.exports = foodNeeds;