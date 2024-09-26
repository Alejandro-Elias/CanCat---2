'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.bulkInsert('Statuses', [
      {
        name: 'pago',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'pendiente de pago',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'cancelado',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'rechazado',
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Statuses', null, {});
    
  }
};
