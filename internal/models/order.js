const mongoose = require('mongoose');
const Restaurant = require('./restaurants');
const User = require('./user');

const orderSchema = new mongoose.Schema({
    userID :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    restaurantID : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Restaurant'
    },
    time: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Order', orderSchema);