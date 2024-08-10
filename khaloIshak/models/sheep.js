const { Sequelize, DataTypes, VIRTUAL } = require("sequelize");
const sequelize = require("./connection");
const breed = require("../models/breeds");
const chambers = require("../models/chambers");
const raising = require("./raising_method");

const sheep = sequelize.define(
  "sheep",
  {
    رقم_الغنم: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    تاريخ_الميلاد: {
      type: DataTypes.DATE,
    },
    تاريخ_الدخول: {
      type: DataTypes.DATE,
    },
    الجنس: {
      type: DataTypes.STRING,
    },
    العمر: {
      type: DataTypes.INTEGER,
    },
    الوزن: {
      type: DataTypes.INTEGER,
    },
    رقم_السلالة: {
      type: DataTypes.INTEGER,
      references: {
        model: breed, //the model name for breeds is 'breed'
        key: "رقم_السلالة",
      },
    },
    رقم_الغرفة: {
      type: DataTypes.INTEGER,
      references: {
        model: chambers, // the chambers model
        key: "رقم_الغرفة",
      },
    },
    نوع_الإنتاج: {
      type: DataTypes.STRING,
    },
    رقم_الأم: {
      type: DataTypes.INTEGER,
    },
    رقم_الأب: {
      type: DataTypes.INTEGER,
    },
    الهدف_من_التربية: {
      type: DataTypes.INTEGER,
      references: {
        model: raising,
        key: "الهدف_من_التربية",
      },
    },
    مرحلة_النمو: {
      type: DataTypes.INTEGER,
    },
    التلقيحات_والتحصينات: {
      type: DataTypes.STRING,
    },
    الاحتياج_الغذائي: {
      type: DataTypes.STRING,
    },
    الحالة_الظاهرة: {
      type: DataTypes.STRING,
    },
    التكلفة_المحلية: {
      type: DataTypes.DOUBLE,
    },
  },
  
  {
    tableName: "الأغنام",
    timestamps: false,
  }
);

async () => {
  await sequelize.sync({ force: false });
  console.log("All models were synced");
};

/*

sheep.belongsTo(chambers)
chambers.hasMany(sheep)
sheep.belongsTo(breed)
breed.hasMany(sheep)

*/
module.exports = sheep;
