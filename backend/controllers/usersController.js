const User = require('../models/User');

exports.register = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(200).send(user)
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            const err = new Error('Account or Password is not correct!');
            err.statusCode = 400;    
            return next(err);
        }
        else {
            if (req.body.password === user.password) {
                res.status(200).send(user)
            } else {
                const err = new Error('Account or Password is not correct!');
                err.statusCode = 400;    
                return next(err);
            }
        }
    } catch (error) {
        res.json(error);
    }
}

exports.getAllUser = async (req, res, next) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.json(error)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {...req.body}, {new:true});
        res.status(200).send(user)
    } catch (err) {
        next(err)
    }
}

exports.getById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).send(user)
    } catch (err) {
        next(err)
    }
}