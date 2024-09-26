'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flavor extends Model {
    static associate(models) {
      Flavor.hasMany(models.stock,{
        as : "flavor_stock",
        foreignKey : "flavorId"
      })
    }
  };
  Flavor.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'flavor',
    tableName: 'Flavors'
  });
  return Flavor;
};
