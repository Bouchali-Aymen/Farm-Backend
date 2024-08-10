const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./connection");
const growing = require("./growing");



const nuttrition_goals = sequelize.define("nuttrition_goals" , {


    مرحلة_النمو : {
        primaryKey : true ,
        type : DataTypes.INTEGER , 
       references : {
        model : growing , 
        key : 'رقم_المرحلة'
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
    tableName: "nuttrition_goals",
    timestamps: false,
  }





)


module.exports = nuttrition_goals