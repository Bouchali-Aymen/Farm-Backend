const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./connection");
const food = require("./food");


const nuttrtion = sequelize.define("nuttrition" , {
    اعلاف : {
        primaryKey : true ,
        type : DataTypes.INTEGER , 
       references : {
        model : food , 
        key : 'id'
       }
    } ,
 
    المقدار_الجاف : {
        type : DataTypes.DOUBLE
        , allowNull : false
    } ,
 
    الالياف_الخام : {
        type : DataTypes.DOUBLE
        , allowNull : false
    } ,
 
    البروتين : {
        type : DataTypes.DOUBLE
        , allowNull : false
    },
 
    الكالسيوم : {
        type : DataTypes.DOUBLE
        , allowNull : false
    },
 
    الفسفور : {
        type : DataTypes.DOUBLE
        , allowNull : false
    },

    المغنيزيوم : {
        type : DataTypes.DOUBLE
        , allowNull : false
    },


} , 

{
    tableName: "nuttrition",
    timestamps: false,
  }


)

module.exports = nuttrtion