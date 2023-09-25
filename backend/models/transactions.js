'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transactions.belongsTo(models.booking_payments, {
        foreignKey: "booking_id"
      });
    }
  }
  transactions.init({
    booking_id: DataTypes.INTEGER,
    order_id: DataTypes.STRING,
    order_date: DataTypes.DATE,
    bank: DataTypes.STRING,
    va_number: DataTypes.STRING,
    status_code: DataTypes.INTEGER,
    transaction_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};