'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('booking_payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      tentor_id: {
        type: Sequelize.INTEGER
      },
      choose_course: {
        type: Sequelize.STRING
      },
      study_preference: {
        type: Sequelize.STRING
      },
      study_duration: {
        type: Sequelize.FLOAT
      },
      study_start_time: {
        type: Sequelize.TIME
      },
      study_end_time: {
        type: Sequelize.TIME
      },
      choose_package: {
        type: Sequelize.STRING
      },
      private_fee: {
        type: Sequelize.INTEGER
      },
      unique_code: {
        type: Sequelize.INTEGER
      },
      midtrans_fee: {
        type: Sequelize.INTEGER
      },
      total_transfer: {
        type: Sequelize.INTEGER
      },
      transaction_status: {
        type: Sequelize.STRING,
        defaultValue: 'pending'
      },
      redirect_url: {
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
    await queryInterface.dropTable('booking_payments');
  }
};