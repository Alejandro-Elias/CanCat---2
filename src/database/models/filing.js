'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Filing extends Model {

    static associate(models) {
      Filing.hasMany(models.product, {
        as : "filing_products",
        foreignKey : "filingId"
      });
    }
  }
  Filing.init({
    measure: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'filing',
    tableName: 'Filings'
  });
  return Filing;
};