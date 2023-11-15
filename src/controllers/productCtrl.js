const joi = require('joi')

const {
  errorHandler,
  handleResponseSuccess,
  responsePagination,
} = require('../helpers')

const { Products, Categories } = require('../models')

exports.createProduct = async (req, res) => {
  try {
    const newData = req.body
    const scheme = joi.object({
      name: joi.string().min(3).required(),
      description: joi.string().min(10).required(),
      price: joi.number().required(),
      categoryId: joi.number().required(),
      quantity: joi.number().min(1).required(),
    })

    const { error } = scheme.validate(newData)
    if (error) {
      return errorHandler(
        res,
        400,
        'Validation Failed',
        error.details[0].message
      )
    }
    const findCategory = await Categories.findByPk(newData?.categoryId)
    if (!findCategory) {
      return errorHandler(res, 404, 'Not found', 'Category not found')
    }
    await Products.create(newData)
    return handleResponseSuccess(
      res,
      201,
      'Created',
      'Create product successfully!'
    )
  } catch (error) {
    return errorHandler(res, 500, 'Internal server error', error.message)
  }
}
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params
    const newProductData = req.body
    const productSchema = joi.object({
      name: joi.string().min(3).required(),
      description: joi.string().min(10).required(),
      price: joi.number().required(),
      categoryId: joi.number().required(),
      quantity: joi.number().min(1).required(),
    })

    const { error: validationError } = productSchema.validate(newProductData)
    if (validationError) {
      return errorHandler(
        res,
        400,
        'Validation Failed',
        validationError.details[0].message
      )
    }

    const product = await Products.findByPk(productId)
    if (!product) {
      return errorHandler(res, 404, 'Not found', 'Product not found')
    }

    const { categoryId } = newProductData
    const category = await Categories.findByPk(categoryId)
    if (!category) {
      return errorHandler(res, 404, 'Not found', 'Category not found')
    }

    await product.update(newProductData)

    return handleResponseSuccess(
      res,
      200,
      'Updated',
      'Product updated successfully!'
    )
  } catch (error) {
    return errorHandler(res, 500, 'Internal server error', error.message)
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params

    const product = await Products.findByPk(productId)
    if (!product) {
      return errorHandler(res, 404, 'Not found', 'Product not found')
    }
    await product.destroy()

    return handleResponseSuccess(
      res,
      200,
      'Deleted',
      'Product deleted successfully!'
    )
  } catch (error) {
    return errorHandler(res, 500, 'Internal server error', error.message)
  }
}

// get all product
exports.getProducts = async (req, res) => {
  try {
    const { pageNumber = 1, pageSize = 20 } = req.query
    const { count, rows } = await Products.findAndCountAll({
      include: 'category',
      offset: Number(pageSize) * (Number(pageNumber) - 1),
      limit: Number(pageSize),
    })
    const { next, previous } = responsePagination(
      rows,
      pageNumber,
      pageSize,
      '/products'
    )
    return handleResponseSuccess(res, 200, 'Ok', {
      count,
      next,
      previous,
      results: rows,
    })
  } catch (error) {
    return errorHandler(res, 500, 'Internal server error', error.message)
  }
}
