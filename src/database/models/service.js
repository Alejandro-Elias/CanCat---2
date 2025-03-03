'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Service.init({
    name: {
      type: DataTypes.STRING,
      allowNull : false
    }, 
    price:{ 
      type : DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    discount: {
      type : DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'service',
    tableName: 'Services'
  });
  return Service;
};