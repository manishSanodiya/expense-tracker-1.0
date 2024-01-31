const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const ForgotPasswords = sequelize.define("Forgotpasswords", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
  return ForgotPasswords
};
