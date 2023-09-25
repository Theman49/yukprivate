'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      students.belongsTo(models.registers, {
        foreignKey: "user_id"
      });
    }
  }
  students.init({
    user_id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    gender: DataTypes.STRING,
    date_of_birth: DataTypes.DATEONLY,
    no_handphone: DataTypes.STRING,
    address: DataTypes.TEXT,
    pin_point: DataTypes.STRING,
    school_name: DataTypes.STRING,
    student_class: DataTypes.STRING,
    school_major: DataTypes.STRING,
    url_picture: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'students',
  });
  return students;
};