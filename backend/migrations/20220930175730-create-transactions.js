'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
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
          key: "id"
        },
      },
      order_id: {
        type: Sequelize.STRING
      },
      order_date: {
        type: Sequelize.DATE
      },
      bank: {
        type: Sequelize.STRING
      },
      va_number: {
        type: Sequelize.STRING
      },
      status_code: {
        type: Sequelize.INTEGER
      },
      transaction_status: {
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
    await queryInterface.dropTable('transactions');
  }
};