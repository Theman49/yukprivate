'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tentor_schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tentor_id: {
        type: Sequelize.INTEGER
      },
      schedule_id: {
        type: Sequelize.INTEGER,
        reference: {
          models: "tentors",
          key: "id"
        }
      },
      day: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.TIME
      },
      duration: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('tentor_schedules');
  }
};