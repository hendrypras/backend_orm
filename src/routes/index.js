const { Router } = require('express')

const productRoute = require('./productRoute')
const producCategorytRoute = require('./categoryRoute')
const orderRoute = require('./orderRoute')
const cartRoute = require('./cartRoute')
const userRoute = require('./userRoute')

const router = Router()

// Products
router.use(productRoute)
// Products Category
router.use(producCategorytRoute)
// Orders
router.use(orderRoute)
// Carts
router.use(cartRoute)
// Users
router.use(userRoute)

module.exports = router
