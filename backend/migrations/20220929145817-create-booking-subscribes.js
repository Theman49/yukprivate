'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('booking_subscribes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      booking_id: {
        type: Sequelize.INTEGER,
        reference: {
          models: "booking_payments",
          key: "id"
        },
      },
      amount_meeting: {
        type: Sequelize.INTEGER
      },
      study_start_date: {
        type: Sequelize.DATEONLY
      },
      choose_day: {
        type: Sequelize.STRING
      },
      choose_time: {
        type: Sequelize.STRING
      },
      choose_duration: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('booking_subscribes');
  }
};