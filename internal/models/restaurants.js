const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    brand:{
        type: String,
        required: [false]
    },
    location: {
        latitude: {
            type: Number,
            required: [true, "Please enter latitude"]
        },
        longitude: {
            type: Number,
            required: [true, "Please enter longitude"]
        },
        province: {
            type: String,
            required: [true, "Please enter province"]
        },
        district: {
            type: String,
            required: [true, "Please enter district"]
        },
        street: {
            type: String,
            required: [true, "Please enter street"]
        }
    },
    image: {
        type: String,
        required: [true, "Please enter image"]
    }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
