"use strict";

const productsJSON = require("../../data/productos.json");

const imagesDB = productsJSON.flatMap((product, index) => [
  {
    primary : 1,
    file: product.image1,
    productId: index + 1, 
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    primary : 2,
    file: product.image2,
    productId: index + 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Image_products",
      imagesDB,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Image_products", null, {});
  },
};
