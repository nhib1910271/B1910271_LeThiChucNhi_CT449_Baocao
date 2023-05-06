const express = require('express');
const tour = require('../controllers/toursController');
const router = express.Router();

router.route('/')
    .get(tour.getAllTours)
    .post(tour.createOneTour);

router.route('/:id')
    .get(tour.getById)
    .put(tour.updateOneTour)
    .delete(tour.deleteOneTour)

module.exports = router

