'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Items.init({
    amount: {
      type : DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type : DataTypes.INTEGER,
      allowNull: false,
    },
    saleId: {
      type : DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'items',
    tableName: 'Items'
  });
  return Items;
};