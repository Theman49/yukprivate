'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking_subscribes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      booking_subscribes.belongsTo(models.booking_payments, {
        foreignKey: "booking_id"
      });
    }
  }
  booking_subscribes.init({
    booking_id: DataTypes.INTEGER,
    amount_meeting: DataTypes.INTEGER,
    study_start_date: DataTypes.DATEONLY,
    choose_day: DataTypes.STRING,
    choose_time: DataTypes.STRING,
    choose_duration: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'booking_subscribes',
  });
  return booking_subscribes;
};