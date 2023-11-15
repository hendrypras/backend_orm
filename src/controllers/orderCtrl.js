const joi = require('joi')

const { errorHandler, handleResponseSuccess } = require('../helpers')

const sequelize = require('../config/connectDb')

const { Products, Orders, OrderDetails, Users } = require('../models')

exports.createOrder = async (req, res) => {
  const transaction = await sequelize.transaction()

  try {
    const { orderItems, userId } = req.body

    const schema = joi.object({
      userId: joi.number().positive().required(),
      orderItems: joi
        .array()
        .items(
          joi.object({
            productId: joi.number().integer().positive().required(),
            quantity: joi.number().integer().positive().required(),
            totalPrice: joi.number().integer().positive().required(),
          })
        )
        .required(),
    })

    const { error } = schema.validate({ orderItems, userId })

    if (error) {
      await transaction.rollback()
      return errorHandler(
        res,
        400,
        'Validation Failed',
        error.details[0].message
      )
    }
    const user = await Users.findByPk(userId)
    if (!user) return errorHandler(res, 404, 'Not found', 'User not found')
    let totalOrderPrice = 0

    for (const orderItem of orderItems) {
      const product = await Products.findByPk(orderItem.productId, {
        transaction,
      })

      if (!product) {
        await transaction.rollback()
        return errorHandler(res, 404, 'Not Found', 'Product not found')
      }

      if (product.quantity === 0 || product.quantity < orderItem.quantity) {
        await transaction.rollback()
        return errorHandler(
          res,
          400,
          'Bad Request',
          `${product.name} Out of stock`
        )
      }

      totalOrderPrice += orderItem.totalPrice
    }

    const newOrder = await Orders.create(
      {
        total: totalOrderPrice,
        userId: userId,
      },
      { transaction }
    )

    for (const orderItem of orderItems) {
      await OrderDetails.create(
        {
          productId: orderItem.productId,
          orderId: newOrder.id,
          userId: userId,
          quantity: orderItem.quantity,
          price: orderItem.totalPrice,
        },
        { transaction }
      )
    }

    await transaction.commit()

    return handleResponseSuccess(
      res,
      201,
      'Created',
      'Create order successfully'
    )
  } catch (error) {
    await transaction.rollback()
    return errorHandler(res, 500, 'Internal server error', error.message)
  }
}
exports.getOrders = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await Users.findByPk(userId)
    if (!user) return errorHandler(res, 404, 'Not found', 'User not found')
    const response = await Orders.findAll({
      where: { userId },
      include: [
        {
          model: OrderDetails,
          attributes: ['productId', 'quantity', 'price'],
          include: [
            {
              model: Products,
            },
          ],
        },
      ],
    })
    if (!response.length) {
      return handleResponseSuccess(res, 200, 'Ok', null)
    }
    return handleResponseSuccess(res, 200, 'Ok', response[0])
  } catch (error) {
    return errorHandler(res, 500, 'Internal server error', error.message)
  }
}
