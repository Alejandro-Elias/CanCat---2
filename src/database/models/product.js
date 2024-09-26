'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.image_products,{
        as : "Image_products",
        foreignKey : "productId"
      })
      Product.belongsTo(models.specie,{
      as : "product_species",
     foreignKey : "specieId"
      })
      Product.belongsTo(models.flavor,{
       as : "product_flavor",
        foreignKey : "brandId"
    })
    Product.hasMany(models.stock, {
      as : "product_stock",
      foreignKey : "productId"
    });
    Product.belongsTo(models.filing, {
      as : "product_filing",
      foreignKey : "filingId"
    });
    Product.belongsTo(models.brand, {
      as : "product_brand",
      foreignKey : "BrandId"
    });
    }
  }
  
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    value: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    specieId: DataTypes.INTEGER,
    filingId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
    tableName: 'Products'
  });
  return Product;
};

