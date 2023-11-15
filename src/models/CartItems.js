'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CartItems extends Model {
    static associate(models) {}
  }
  CartItems.init(
    {
      quantity: DataTypes.INTEGER,
      productId: DataTypes.BIGINT,
      cartId: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: 'CartItems',
    }
  )
  return CartItems
}
