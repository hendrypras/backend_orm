const joi = require('joi')

const { errorHandler, handleResponseSuccess } = require('../helpers')

const { Products, Carts, CartItems, Users } = require('../models')

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body
    const scheme = joi.object({
      userId: joi.number().positive().required(),
      productId: joi.number().positive().required(),
      quantity: joi.number().positive().required(),
    })

    const { error } = scheme.validate(req.body)
    if (error) {
      return errorHandler(
        res,
        400,
        'Validation Failed',
        error.details[0].message
      )
    }
    const user = await Users.findByPk(userId)
    const product = await Products.findByPk(productId)
    if (!user || !product) {
      return errorHandler(res, 404, 'Not Found', 'User or Product not found')
    }

    let cart = await Carts.findOne({ where: { userId } })

    if (!cart) {
      cart = await Carts.create({ userId })
    }

    const [cartItem, created] = await CartItems.findOrCreate({
      where: { CartId: cart.id, ProductId: productId },
      defaults: { quantity },
    })

    if (!created) {
      cartItem.quantity += quantity
      await cartItem.save()
    }

    return handleResponseSuccess(
      res,
      201,
      'Created',
      'Product added to cart successfully'
    )
  } catch (error) {
    return errorHandler(res, 500, 'Internal server error', error.message)
  }
}
exports.getCarts = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await Users.findByPk(userId)
    if (!user) return errorHandler(res, 404, 'Not Found', 'User not found')
    const carts = await Carts.findAll({
      where: { userId },
      include: [Products],
    })

    return handleResponseSuccess(res, 200, 'Ok', carts[0])
  } catch (error) {
    return errorHandler(res, 500, 'Internal server error', error.message)
  }
}

exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params

    const user = await Users.findByPk(userId)
    const product = await Products.findByPk(productId)

    if (!user || !product) {
      return errorHandler(res, 404, 'Not Found', 'User or Product not found')
    }

    const cart = await Carts.findOne({ where: { userId } })

    if (!cart) {
      return errorHandler(res, 404, 'Not Found', 'Cart not found for the user')
    }

    const cartItem = await CartItems.findOne({
      where: { CartId: cart.id, ProductId: productId },
    })

    if (!cartItem) {
      return errorHandler(res, 404, 'Not Found', 'Product not found in cart')
    }
    await cart.destroy()
    await cartItem.destroy()

    return handleResponseSuccess(
      res,
      200,
      'Deleted',
      'Product removed from cart successfully'
    )
  } catch (error) {
    return errorHandler(res, 500, 'Internal server error', error.message)
  }
}
