const express = require('express')
const {
  addToCart,
  getCarts,
  removeFromCart,
} = require('../controllers/cartCtrl')
const router = express.Router()

router.post('/cart', addToCart)
router.get('/carts/:userId', getCarts)
router.delete('/cart/:userId/:productId', removeFromCart)

module.exports = router
