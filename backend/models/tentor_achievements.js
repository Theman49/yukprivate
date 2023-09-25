'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tentor_achievements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      tentor_achievements.belongsTo(models.tentors, {
        foreignKey: "achievement_id"
      });

    }
  }
  tentor_achievements.init({
    tentor_id: DataTypes.INTEGER,
    achievement_id: DataTypes.INTEGER,
    achievement_name: DataTypes.STRING,
    organizer_name: DataTypes.STRING,
    date_of_activity: DataTypes.STRING,
    url_certificate: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'tentor_achievements',
  });
  return tentor_achievements;
};