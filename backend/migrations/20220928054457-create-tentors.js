'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tentors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tentor_id: {
        type: Sequelize.INTEGER,
        reference: {
          models: "registers",
          key: "id"
        }
      },
      experience_id: {
        type: Sequelize.INTEGER,
        reference: {
          models: "tentor_experiences",
          key: "tentor_id"
        }
      },
      achievement_id: {
        type: Sequelize.INTEGER,
        reference: {
          models: "tentor_achievements",
          key: "tentor_id"
        }
      },
      proposal_id: {
        type: Sequelize.INTEGER,
        reference: {
          models: "tentor_proposals",
          key: "tentor_id"
        }
      },
      schedule_id: {
        type: Sequelize.INTEGER,
        reference: {
          models: "tentor_schedules",
          key: "tentor_id"
        }
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
      last_education: {
        type: Sequelize.STRING
      },
      institution_name: {
        type: Sequelize.STRING
      },
      tentor_major: {
        type: Sequelize.STRING
      },
      graduation_year: {
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
    await queryInterface.dropTable('tentors');
  }
};