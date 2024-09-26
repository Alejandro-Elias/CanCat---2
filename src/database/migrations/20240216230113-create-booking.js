'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      date_and_time: {
        type: Sequelize.DATE
      },
      petId: {
        type: Sequelize.INTEGER,
        references: {
          model : {
            tableName: "Pets"
          }
        }
      },
      saleId: {
        type: Sequelize.INTEGER,
        references: {
          model : {
            tableName: "Sales"
          }
        }
      },
      serviceId: {
        type: Sequelize.INTEGER,
        references: {
          model : {
            tableName: "Services"
          }
        }
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
    await queryInterface.dropTable('Bookings');
  }
};