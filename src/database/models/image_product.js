'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image_product extends Model {
    static associate(models) {
      Image_product.belongsTo(models.product,{
        as : "Product",
        foreignKey : "productId"
      })
    }
  };
  Image_product.init({
    file: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    primary : {
      type : DataTypes.BOOLEAN,
      allowNull : false            
    },
  }, {
    sequelize,
    modelName: 'image_products',
    tableName: 'Image_products'
  });
  return Image_product;
};
