'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    static associate(models) {
      Pet.belongsTo(models.user, {
        as: "user",
        foreignKey: "userId"
      });
      Pet.belongsTo(models.specie, {
        as: "especie",
        foreignKey: "specieId"
      })
    }
  }
  Pet.init({
    name: {
      type: DataTypes.STRING

    },
    specieId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'pet',
    tableName: 'Pets'
  });
  return Pet;
};