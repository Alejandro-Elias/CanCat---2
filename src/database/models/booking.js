'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    name: DataTypes.STRING,
    date_and_time: DataTypes.DATE,
    petId: DataTypes.INTEGER,
    saleId: DataTypes.INTEGER,
    serviceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'booking',
    tableName: 'Bookings'
  });
  return Booking;
};