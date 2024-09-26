'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.bulkInsert('Services', [
      {
        name: 'baño',
        price: 1000,
        description : "Baño completo para tu mascota",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'corte de pelo',
        price: 1000,
        description : "Corte de pelo para tu mascota",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'guarderia',
        price: 1000,
        description : "El mejor cuidado para tu mascota",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'vacunación',
        price: 1000,
        description : "Veni a vacunar a tu mascota",
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Services', null, {});

  }
};
