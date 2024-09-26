'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Species extends Model {
 
    static associate(models) {
      Species.hasMany(models.pet , {
        as : "mascota",
        foreignKey : "specieId"
      })
       
      Species.hasMany(models.product , {
        as : "species_product",
        foreignKey : "specieId"
      }) 
    }
  }
  Species.init({
    name:{
     type: DataTypes.STRING,
     allowNull : false
    } 
  }, {
    sequelize,
    modelName: 'specie',
    tableName: 'Species'
  });
  return Species;
};