const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./connection");


const raising = sequelize.define( "raising" ,{
    رقم_الهدف:{
        type : DataTypes.INTEGER ,
        primaryKey : true , 
        allowNull : false
    } ,
    اسم_الهدف:{
        type : DataTypes.STRING ,
        allowNull : false
    }
}, 

{
    tableName:'أهداف_التربية',
    timestamps:false
},


);


module.exports = raising