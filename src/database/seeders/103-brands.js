'use strict';

const productsJSON = require("../../data/productos.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const brands = [...new Set(productsJSON.map(product => product.brand))].map(brand => ({
      name: brand,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return queryInterface.bulkInsert('Brands', brands, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Brands', null, {});
  }
};
