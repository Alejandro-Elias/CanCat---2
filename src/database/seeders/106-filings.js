"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const measures = [
      
      { measure: "Kilogramos", createdAt: new Date(), updatedAt: new Date() },

      {measure: "Gramos", createdAt: new Date(), updatedAt: new Date()},

      { measure: "Largo", createdAt: new Date(), updatedAt: new Date() },

      { measure: "Ancho", createdAt: new Date(), updatedAt: new Date() },

      { measure: "Alto", createdAt: new Date(), updatedAt: new Date() },

      { measure: "Otro", createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert("Filings", [...measures], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Filings", null, {});
  },
};
