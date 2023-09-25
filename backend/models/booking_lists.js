'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking_lists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      booking_lists.belongsTo(models.booking_payments, {
        foreignKey: "booking_id"
      });
    }
  }
  booking_lists.init({
    booking_id: DataTypes.INTEGER,
    study_schedule: DataTypes.DATEONLY,
    choose_day: DataTypes.STRING,
    choose_time: DataTypes.STRING,
    choose_duration: DataTypes.STRING,
    booking_status: DataTypes.STRING,
    topic_class: DataTypes.TEXT,
    url_activity_picture: DataTypes.STRING,
    isValidatedByTentor: DataTypes.BOOLEAN,
    isValidatedByStudent: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'booking_lists',
  });
  return booking_lists;
};