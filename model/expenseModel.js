module.exports = (sequelize,DataTypes) =>{
    const Expense = sequelize.define("expense",{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        type:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Expense;
} 