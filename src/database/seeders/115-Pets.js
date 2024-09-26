'use strict';

const usersJSON = require("../../data/users.json")

var user = 0

const usersDB = usersJSON.map(({mascota, especie}) => {

  user = user + 1;

  return {
    name : mascota,
    specieId : especie == "perro" ? 1 : especie == "gato" ? 2 : especie == "ave" ? 3 : especie == "pez" ? 4 : especie == "roedor" ? 5 : 6,
    userId : user,
    createdAt : new Date(),
    updatedAt : new Date() 
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Pets',usersDB, {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pets', null, {});
  }
};
