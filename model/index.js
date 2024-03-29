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
db.expenses = require("./expenseModel")(sequelize,DataTypes)
db.orders = require('./orderModel')(sequelize,DataTypes)
db.forgotpasswords = require('./forgotPassword')(sequelize,DataTypes)
db.downloads = require('./download')(sequelize,DataTypes)

db.users.hasMany(db.expenses);
db.expenses.belongsTo(db.users);

db.users.hasMany(db.orders)
db.orders.belongsTo(db.users);

db.users.hasMany(db.forgotpasswords);
db.forgotpasswords.belongsTo(db.users);

db.users.hasMany(db.downloads);
db.downloads.belongsTo(db.users)

db.sequelize.sync({force : false})
.then(()=>{
    console.log('synced');
})
.catch((err)=>{console.log('not synced',err)});


module.exports = db;