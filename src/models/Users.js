'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasOne(models.Carts)
      Users.hasMany(models.Orders, { foreignKey: 'userId' })
    }
  }
  Users.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Users',
    }
  )
  return Users
}
