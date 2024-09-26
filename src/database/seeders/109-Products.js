'use strict';

const productsJSON = require("../../data/productos.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const brands = await queryInterface.sequelize.query(
      `SELECT id, name FROM Brands;`
    );

    const filings = await queryInterface.sequelize.query(
      `SELECT id, measure FROM filings;`
    );

    const getForeignKey = (name, array) => {
      const item = array.find(item => item.name === name);
      return item ? item.id : null;
    };

    const products = productsJSON.map(product => ({
      name: product.name,
      price: product.price,
      discount: product.discount,
      description: product.description,
      value: product.value,
      brandId: getForeignKey(product.brand, brands[0]),
      specieId: product.species == "perro" ? 1 : product.species == "gato" ? 2 : product.species == "ave" ? 3  : product.species == "pez" ? 4 : product.species == "roedor" ? 5 :  6,
      filingId: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return queryInterface.bulkInsert('Products', products, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
