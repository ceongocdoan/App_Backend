const express = require('express');
const {listRestaurants} = require('../services/restaurants')

const router = express();

router.route("/").get(listRestaurants);

module.exports = router;