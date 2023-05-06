const { query } = require('express');
const Order = require('../models/Order');

//create one tour
exports.createOneOrder = async (req, res, next) => {
    try {
        const order = await Order.create(req.body)
        res.status(200).json({
            status: 'success',
            data: order
        })
    } catch (error) {
       next(error)
    }
}

//get all books
exports.getAllOrder = async (req, res, next) => {
    try {
        const orders = await Order.find({})
            .populate('useId').populate('tourId')
        res.status(200).send(orders)
    } catch (error) {
        res.json(error)
    }
}

exports.getOrdersByUser = async (req, res, next) => {
    try {
        const orders = await Order.find({
            useId: req.query.user
        }).populate('useId').populate('tourId')
        res.status(200).send(orders)
    } catch (err) {
        res.json(error)
    }
}
