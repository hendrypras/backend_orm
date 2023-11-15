'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      Products.belongsTo(models.Categories, {
        as: 'category',
        foreignKey: {
          name: 'categoryId',
        },
      })
      Products.belongsToMany(models.Carts, { through: models.CartItems })
      Products.hasMany(models.OrderDetails, { foreignKey: 'productId' })
    }
  }

  Products.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.BIGINT,
      categoryId: DataTypes.BIGINT,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Products',
    }
  )
  return Products
}
