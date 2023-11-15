const { errorHandler, handleResponseSuccess } = require('../helpers')

const { Users } = require('../models')
const joi = require('joi')
exports.createUser = async (req, res) => {
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
    await Users.create(newData)
    return handleResponseSuccess(
      res,
      201,
      'Created',
      'Created user successfully'
    )
  } catch (error) {
    return errorHandler(res, 500, 'Internal server error', error.message)
  }
}
