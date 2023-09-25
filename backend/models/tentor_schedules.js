'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tentor_schedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      tentor_schedules.belongsTo(models.tentors, {
        foreignKey: "schedule_id"
      });

    }
  }
  tentor_schedules.init({
    tentor_id: DataTypes.INTEGER,
    schedule_id: DataTypes.INTEGER,
    day: DataTypes.STRING,
    time: DataTypes.TIME,
    duration: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'tentor_schedules',
  });
  return tentor_schedules;
};