'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(
        models.Review,
        {foreignKey: 'spotId', onDelete: 'CASCADE'}
      )


      Spot.hasMany(
        models.Image,
        {foreignKey: 'imageableId', onDelete: 'CASCADE'}
      )


      Spot.belongsTo(
        models.User,
        {foreignKey: 'ownerId', onDelete: 'CASCADE'}
      )

      Spot.hasMany(
        models.Booking,
        {foreignKey: 'spotId', onDelete: 'CASCADE'}
      )

    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
