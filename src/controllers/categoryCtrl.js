const { errorHandler, handleResponseSuccess } = require('../helpers')

const { Categories } = require('../models')
const joi = require('joi')
exports.createCategory = async (req, res) => {
  try {
    const newData = req.body
    const scheme = joi.object({
      name: joi.string().min(3).required(),
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
    await Categories.create(newData)
    return handleResponseSuccess(
      res,
      201,
      'Created',
      'Created category successfully'
    )
  } catch (error) {
    return errorHandler(res, 500, 'Internal server error', error.message)
  }
}

// get all category
exports.getCategories = async (req, res) => {
  try {
    const { count, rows } = await Categories.findAndCountAll()
    return handleResponseSuccess(res, 200, 'Ok', {
      count,
      results: rows,
    })
  } catch (error) {
    return errorHandler(res, 500, 'Internal server error', error.message)
  }
}
