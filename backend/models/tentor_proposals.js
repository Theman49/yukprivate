'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tentor_proposals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      tentor_proposals.belongsTo(models.tentors, {
        foreignKey: "proposal_id"
      });

      tentor_proposals.belongsTo(models.registers, {
        foreignKey: "course_interest"
      });

    }
  }
  tentor_proposals.init({
    tentor_id: DataTypes.INTEGER,
    proposal_id: DataTypes.INTEGER,
    tentor_introduction: DataTypes.TEXT,
    reason_for_registering: DataTypes.STRING,
    url_esay: DataTypes.TEXT,
    course_interest: DataTypes.STRING,
    preferences: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tentor_proposals',
  });
  return tentor_proposals;
};