'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('booking_lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      booking_id: {
        type: Sequelize.INTEGER,
        reference: {
          models: 'booking_payments',
          key: 'id'
        },
      },
      study_schedule: {
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
      booking_status: {
        type: Sequelize.STRING,
        defaultValue: 'pending'
      },
      topic_class: {
        type: Sequelize.STRING
      },
      url_activity_picture: {
        type: Sequelize.STRING
      },
      isValidatedByTentor: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isValidatedByStudent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('booking_lists');
  }
};