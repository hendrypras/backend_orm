'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    static associate(models) {
      Carts.belongsToMany(models.Products, { through: models.CartItems })
    }
  }
  Carts.init(
    {
      userId: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: 'Carts',
    }
  )
  return Carts
}
