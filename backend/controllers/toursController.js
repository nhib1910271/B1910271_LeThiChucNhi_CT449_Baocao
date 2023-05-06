const { query } = require('express');
const Tour = require('../models/Tour');

//create one tour
exports.createOneTour = async (req, res, next) => {
    try {
        const tour = await Tour.create(req.body)
        res.status(200).json({
            status: 'success',
            data: tour
        })
    } catch (error) {
       next(error)
    }
}

//get all books
exports.getAllTours = async (req, res, next) => {
    try {
        const tours = await Tour.find({})
        res.status(200).send(tours)
    } catch (error) {
        res.json(error)
    }
}

//update one books
exports.getById = async (req, res, next) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).send(tour)
    } catch (error) {
        next(error);
    }
}

exports.updateOneTour = async (req, res, next) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, {...req.body}, {new: true});
        res.status(200).send(tour)
    } catch (error) {
        next(error);
    }
}

exports.deleteOneTour = async (req, res, next) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.send({message:"success"});
    } catch (error) {
        next(error);
    }
}