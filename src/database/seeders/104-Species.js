'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.bulkInsert('Species', [
      {
        name: 'perro',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'gato',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'ave',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'pez',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'roedor',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'otro',
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Species', null, {});
    
  }
};
