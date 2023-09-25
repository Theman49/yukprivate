'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        reference: {
          models: "registers",
          key: "id"
        },
      },
      username: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      date_of_birth: {
        type: Sequelize.DATEONLY
      },
      no_handphone: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.TEXT
      },
      pin_point: {
        type: Sequelize.STRING
      },
      school_name: {
        type: Sequelize.STRING
      },
      student_class: {
        type: Sequelize.STRING
      },
      school_major: {
        type: Sequelize.STRING
      },
      url_picture: {
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
    await queryInterface.dropTable('students');
  }
};