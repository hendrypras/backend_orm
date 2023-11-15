const express = require('express')
const { createOrder, getOrders } = require('../controllers/orderCtrl')
const router = express.Router()

router.post('/order', createOrder)
router.get('/orders/:userId', getOrders)

module.exports = router
