'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tentor_experiences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tentor_id: {
        type: Sequelize.INTEGER
      },
      experience_id: {
        type: Sequelize.INTEGER,
        reference: {
          models: "tentors",
          key: "id"
        }
      },
      teaching_place: {
        type: Sequelize.STRING
      },
      teaching_role: {
        type: Sequelize.STRING
      },
      teaching_start_date: {
        type: Sequelize.STRING
      },
      teaching_end_date: {
        type: Sequelize.STRING
      },
      isTeaching: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('tentor_experiences');
  }
};