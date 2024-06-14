const Restaurants = require('../models/restaurants');
const Orders = require('../models/order');
const catchAsync = require('../pkg/catchAsync');

exports.listRestaurants = catchAsync(async (req, res, next) => {
    const listRestaurants = await Restaurants.find()
    res.status(200).json(listRestaurants); 
});

exports.listBrand = catchAsync(async (req, res, next) =>  {
    const province = req.query.province || 'Ha Noi';
    const listRestaurants = await Restaurants.aggregate([
        {
            $match: {
                "location.province": province
            }
        },
        {
            $group: {
                _id: "$brand"
            }
        },
        {
            $project: {
                _id: 0,
                brand: "$_id"
            }
        }
    ])
    const brands = listRestaurants.map(item => item.brand);
    res.status(200).json(brands); 
})

exports.listProvince = catchAsync(async (req, res, next) =>  {
    const result = await Restaurants.aggregate([
        {
            $group: {
                _id: "$location.province"
            }
        },
        {
            $project: {
                _id: 0,
                province: "$_id"
            }
        }
    ])
    const province = result.map(item => item.province);
    res.status(200).json(province); 
})

exports.listOrder = catchAsync(async (req, res, next) => {
    const time = req.query.time
    const query = {};
    if (req.query.province) {
        query["location.province"] = req.query.province;
    }
    if (req.query.brand) {
        query["brand"] = req.query.brand;
    }
    const listRestaurants = await Restaurants.find(query);
    const orders = await Orders.find({ time: time });
    const listRestaurant = [];
    if (orders.length === 0) {
        res.status(200).json(listRestaurants);
        return;
    }
    listRestaurants.forEach(element => {
        orders.forEach(item => {
            if (element._id.toString() !== item.restaurant.ID.toString()) {
                listRestaurant.push(element);
            }
        });
    });

    res.status(200).json(listRestaurant);
});
