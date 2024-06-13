const mongoose = require('mongoose');
const Restaurant = require('./restaurants');
const User = require('./user');

const orderSchema = new mongoose.Schema({
    userID :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    restaurant : {
        ID:{
            type : mongoose.Schema.Types.ObjectId,
            required: true,
        },
        Name:{
            type: String,
            required: true
        }
    },
    time: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Order', orderSchema);