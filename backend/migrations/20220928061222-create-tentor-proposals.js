'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tentor_proposals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tentor_id: {
        type: Sequelize.INTEGER,
      },
      proposal_id: {
        type: Sequelize.INTEGER,
        reference: {
          models: "tentors",
          key: "id"
        }
      },
      tentor_introduction: {
        type: Sequelize.TEXT
      },
      reason_for_registering: {
        type: Sequelize.STRING
      },
      url_esay: {
        type: Sequelize.TEXT
      },
      course_interest: {
        type: Sequelize.STRING,
        reference: {
          models: "registers",
          key: "id"
        }
      },
      preferences:{
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
    await queryInterface.dropTable('tentor_proposals');
  }
};