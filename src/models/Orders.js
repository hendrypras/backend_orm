'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      Orders.belongsTo(models.Users, { foreignKey: 'userId' })
      Orders.hasMany(models.OrderDetails, { foreignKey: 'orderId' })
    }
  }
  Orders.init(
    {
      total: DataTypes.BIGINT,
      userId: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: 'Orders',
    }
  )
  return Orders
}
