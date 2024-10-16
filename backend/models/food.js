const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./connection");
const { database } = require("../config/db");


const food = sequelize.define("food",{

    id : {
         type : DataTypes.INTEGER , 
         primaryKey : true,
         autoIncrement : true
    } ,

    "العلف" : {
        type : DataTypes.STRING
        
    } , 
    "الكمية" : {
        type : DataTypes.DOUBLE , 
        allowNull : false
    } , 
    "تكلفة_الكيلو_الواحد" : {
        type : DataTypes.DOUBLE , 
        allowNull : false
    }

    ,
    "التكلفة" : {
        type : DataTypes.DOUBLE
    }
} , 

{
    tableName: "اعلاف",
    timestamps: false,
  }


)
module.exports = food