const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: String,
    avt: String,
    price: Number,
    tourists: Number,
    day: Number,
    night: Number,
    start: String,
    description: String,
}, {timestamps: true})

const Tour = mongoose.model('tours', tourSchema);

module.exports = Tour;

