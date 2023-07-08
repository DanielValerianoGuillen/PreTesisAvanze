const express = require("express");
const { createOrders, viewOrder } = require("../controllers/OrdersController");
const router = express.Router();


router.post('/orders',createOrders)
router.get('/orders',viewOrder)


module.exports = router;