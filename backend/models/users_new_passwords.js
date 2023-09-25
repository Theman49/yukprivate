'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_new_passwords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      users_new_passwords.belongsTo(models.registers, {
        foreignKey: 'user_id'
      });

    }
  }
  users_new_passwords.init({
    user_id: DataTypes.INTEGER,
    new_password: DataTypes.STRING,
    isVerifiedNewPassword: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'users_new_passwords',
  });
  return users_new_passwords;
};