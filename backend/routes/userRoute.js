const express = require('express');
const user = require('../controllers/usersController');
const router = express.Router();

router.route('/register')
    .post(user.register);
 
router.route('/login')
    .post(user.login);

router.route('/')
    .get(user.getAllUser)

router.route('/:id')
    .put(user.updateUser)
    .get(user.getById)

module.exports = router