const Restaurants = require('../models/restaurants');
const catchAsync = require('../pkg/catchAsync');

exports.listRestaurants = catchAsync(async (req, res, next) => {
    const listRestaurants = await Restaurants.find()
    res.status(200).json(listRestaurants); 
});