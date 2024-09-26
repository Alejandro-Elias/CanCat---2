"use strict";

const productsJSON = require("../../data/productos.json");

const stockDB = productsJSON.map((product) => {
  return {
    
    flavorId: product.flavor == "Pescado" ? 1 : product.flavor == "Pollo y Arroz" ? 2 : product.flavor == "Carne y Pollo" ? 3  : product.flavor == "Carne" ? 4 : product.flavor == "Leche" ? 5 : product.flavor == "Arroz y Pescado" ? 6 : product.flavor == "Pescado y Carne" ? 7 : 8,
    productId: product.id,
    amount: product.stock,
    createdAt: new Date(),
    updatedAt: new Date()
  };
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "stocks",
      stockDB,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("stocks", null, {});
  },
};
