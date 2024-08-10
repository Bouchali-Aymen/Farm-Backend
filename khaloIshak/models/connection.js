const mysql = require('mysql');

const dbconfig = require('../config/db');

const { Sequelize } = require('sequelize');



const sequelize = new Sequelize(dbconfig.database,dbconfig.user, dbconfig.password, {
    dialect: 'mysql',
    host: 'localhost'

});


module.exports = sequelize;