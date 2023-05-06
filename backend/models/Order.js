const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    useId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tours'
    },
    name: String,
    email: String,
    phone: String,
    address: String,
    adult: Number,
    child: Number,
    total: Number
}, {timestamps: true})

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;

