'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  reviews.init({
    user_id: DataTypes.STRING,
    tentor_id: DataTypes.STRING,
    rate: DataTypes.INTEGER,
    text_review: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'reviews',
  });
  return reviews;
};