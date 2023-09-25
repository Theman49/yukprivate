'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tentor_achievements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tentor_id: {
        type: Sequelize.INTEGER
      },
      achievement_id: {
        type: Sequelize.INTEGER,
        reference: {
          models: "tentors",
          key: "id"
        }
      },
      achievement_name: {
        type: Sequelize.STRING
      },
      organizer_name: {
        type: Sequelize.STRING
      },
      date_of_activity: {
        type: Sequelize.STRING
      },
      url_certificate: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tentor_achievements');
  }
};