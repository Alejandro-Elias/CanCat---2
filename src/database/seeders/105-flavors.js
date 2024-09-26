'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('Flavors', 
      [
        {
        name: "Pescado",
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        name: "Pollo y Arroz",
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        name: "Carne y Pollo",
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        name: "Carne",
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        name: "Leche",
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        name: "Arroz y Pescado",
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        name: "Pescado y Carne",
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
        name: "Otro",
        createdAt: new Date(),
        updatedAt: new Date()
        },
    
      ], 
    
    {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Flavors', null, {});
     
  }
};
