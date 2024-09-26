'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.bulkInsert('Payment_methods', [
      {
        name: 'efectivo',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'tarjeta',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'mercado pago',
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Payment_methods', null, {});
    
  }
};
