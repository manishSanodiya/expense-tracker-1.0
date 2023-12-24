const {Sequelize, DataTypes} = require('sequelize');
const dbConfig = require('../config/dbConfig');

const sequelize = new Sequelize(
    dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
        dialect:dbConfig.dialect,
        host: dbConfig.HOST
    }
);

sequelize.authenticate().then(()=>{
    console.log('database connected');
}).catch((err)=>{
    console.log('database connection problem',err);
})

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require("./userModel")(sequelize,DataTypes)

db.sequelize.sync()
.then(()=>{
    console.log('synced');
})
.catch((err)=>{console.log('not synced',err)});


module.exports = db;