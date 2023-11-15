const express = require('express')
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productCtrl.js')
const router = express.Router()

// METHOD POST
router.post('/product', createProduct)

// METHOD GET
router.get('/products', getProducts)

// METHOD PUT
router.put('/product/:productId', updateProduct)

// METHOD DELETE
router.delete('/product/:productId', deleteProduct)

module.exports = router
