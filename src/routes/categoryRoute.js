const express = require('express')
const { createCategory, getCategories } = require('../controllers/categoryCtrl')
const router = express.Router()

router.post('/category', createCategory)

router.get('/categories', getCategories)

module.exports = router
