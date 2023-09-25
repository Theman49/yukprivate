'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking_independents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      booking_independents.belongsTo(models.booking_payments, {
        foreignKey: "booking_id"
      });
    }
  }
  booking_independents.init({
    booking_id: DataTypes.INTEGER,
    study_schedule: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'booking_independents',
  });
  return booking_independents;
};