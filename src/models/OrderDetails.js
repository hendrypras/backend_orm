'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    static associate(models) {
      OrderDetails.belongsTo(models.Orders, { foreignKey: 'orderId' })
      OrderDetails.belongsTo(models.Products, { foreignKey: 'productId' })
    }
  }
  OrderDetails.init(
    {
      productId: DataTypes.BIGINT,
      orderId: DataTypes.BIGINT,
      userId: DataTypes.BIGINT,
      price: DataTypes.BIGINT,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'OrderDetails',
    }
  )
  return OrderDetails
}
