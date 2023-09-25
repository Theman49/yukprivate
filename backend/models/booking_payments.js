'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking_payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  booking_payments.init({
    user_id: DataTypes.INTEGER,
    tentor_id: DataTypes.INTEGER,
    choose_course: DataTypes.STRING,
    study_preference: DataTypes.STRING,
    study_duration: DataTypes.FLOAT,
    study_start_time: DataTypes.TIME,
    study_end_time: DataTypes.TIME,
    choose_package: DataTypes.STRING,
    private_fee: DataTypes.INTEGER,
    unique_code: DataTypes.INTEGER,
    midtrans_fee: DataTypes.INTEGER,
    total_transfer: DataTypes.INTEGER,
    transaction_status: DataTypes.STRING,
    redirect_url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'booking_payments',
  });
  return booking_payments;
};