const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, trim: true},
    email: {type: String, require: true, unique: true},
    password: { type: String, required: true, minlength: [8, 'Password must be 8 characters']},
    phone: String,
    avt: String,
    type: String,
}, {timestamps: true})

const User = mongoose.model('users', userSchema);

module.exports = User;

