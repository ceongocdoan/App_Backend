const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    location: {
        type: String,
        required:false
    },
    image: {
        type: String,
        required: [true, "Please enter image"]
    }
})

module.exports = mongoose.model('Restaurant', restaurantSchema);