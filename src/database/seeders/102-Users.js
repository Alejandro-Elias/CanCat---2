'use strict';

const usersJSON = require("../../data/users.json")

const usersDB = usersJSON.map(({name, email, password, image, role }) => {
  return {
    name,
    email,
    password,
    image,
    roleId : role == "admin" ? 1 : 2,
    createdAt : new Date(),
    updatedAt : new Date() 
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Users',usersDB, {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
