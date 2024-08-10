const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./connection");



const growing = sequelize.define("growing" , {


    رقم_المرحلة : {
        type : DataTypes.INTEGER,
        primaryKey : true , 
        allowNull : false,
        autoIncrement:true
    } , 

    وصف_المرحلة : {
        type : DataTypes.STRING , 
        allowNull : false
    },
   

} , 

{
    tableName : 'مراحل_النمو' ,
    timestamps : false
}
)

module.exports = growing
