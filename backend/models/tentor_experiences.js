'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tentor_experiences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      tentor_experiences.belongsTo(models.tentors, {
        foreignKey: "experience_id"
      });

    }
  }
  tentor_experiences.init({
    tentor_id: DataTypes.INTEGER,
    experience_id: DataTypes.INTEGER,
    teaching_place: DataTypes.STRING,
    teaching_role: DataTypes.STRING,
    teaching_start_date: DataTypes.STRING,
    teaching_end_date: DataTypes.STRING,
    isTeaching: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tentor_experiences',
  });
  return tentor_experiences;
};