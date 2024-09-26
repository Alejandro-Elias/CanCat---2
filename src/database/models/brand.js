'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    
    static associate(models) {
      Brand.hasMany(models.product,{
        as : "brand_products",
        foreignKey : "brandId"
      })
    }
  }
  Brand.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'brand',
    tableName: 'Brands'
  });
  return Brand;
};