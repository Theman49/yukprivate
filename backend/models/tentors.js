'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tentors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tentors.belongsTo(models.registers, {
        foreignKey: "tentor_id"
      });

      tentors.hasMany(models.tentor_experiences, {
        foreignKey: "experience_id"
      });

      tentors.hasMany(models.tentor_achievements, {
        foreignKey: "achievement_id"
      });

      tentors.hasMany(models.tentor_proposals, {
        foreignKey: "proposal_id"
      });

      tentors.hasMany(models.tentor_schedules, {
        foreignKey: "schedule_id"
      });
    }
  }
  tentors.init({
    tentor_id: DataTypes.INTEGER,
    experience_id: DataTypes.INTEGER,
    achievement_id: DataTypes.INTEGER,
    proposal_id: DataTypes.INTEGER,
    schedule_id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    gender: DataTypes.STRING,
    date_of_birth: DataTypes.DATEONLY,
    no_handphone: DataTypes.STRING,
    address: DataTypes.TEXT,
    pin_point: DataTypes.STRING,
    last_education: DataTypes.STRING,
    institution_name: DataTypes.STRING,
    tentor_major: DataTypes.STRING,
    graduation_year: DataTypes.STRING,
    url_picture: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'tentors',
  });
  return tentors;
};