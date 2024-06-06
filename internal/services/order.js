const Order = require('../models/order');
const catchAsync = require('../pkg/catchAsync');
const ErrorHandler = require('../pkg/errors');
const mongoose = require('mongoose');

exports.createOrder = catchAsync(async (req, res, next) => {
    if (!req.body || !req.body.restaurantID || !req.body.time) {
        return res.status(400).json({ error: 'Missing or invalid request body' });
    }
    const { restaurantID, time } = req.body;
    const order = await Order.create({
        userID: req.user.id,
        restaurantID,
        time
    })
    res.status(201).json(order);
});

exports.listOrder = catchAsync(async (req, res, next) => {
    const ordersWithRestaurants = await Order.aggregate([
        { 
            $match:  { userID:req.user.id }
        },
        {
            $lookup: {
                from: "restaurants", 
                localField: "restaurantID", 
                foreignField: "_id", 
                as: "restaurant"
            }
        },
    ]);
    
    res.status(200).json(ordersWithRestaurants);
});