module.exports = (sequelize,DataTypes) =>{
    const User = sequelize.define("user",{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        ispremiumuser:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        totalexpense:{
            type: DataTypes.INTEGER,
            defaultValue:0.00
        }

    });
    return User;
} 