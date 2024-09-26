'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tickets.init({
    paymentMethodsId:{
      type : DataTypes.INTEGER,
      allowNull: false
    } 
  }, {
    sequelize,
    modelName: 'tickets',
    tableName: 'Tickets'
  });
  return Tickets;
};