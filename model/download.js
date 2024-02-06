

module.exports = (sequelize,DataTypes)=>{
    const Downloads = sequelize.define('Downloads',{
        id: {
            type :DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        downloadUrl:{
            type: DataTypes.STRING,
            unique:true,
            validate:{isUrl:true},
            notEmpty:true,
            allowNull: false,
        }
    })
    return Downloads
}