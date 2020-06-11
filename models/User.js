const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, minlength: 3},
    score: {type: Number, required: true, min: 0, max: 100},
    country: {type: String, minlength: 3}
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)