const express = require('express');
const order = require('../controllers/ordersController');
const router = express.Router();

router.route('/')
    .get(order.getAllOrder)
    .post(order.createOneOrder);

router.route('/user')
    .get(order.getOrdersByUser)

module.exports = router

