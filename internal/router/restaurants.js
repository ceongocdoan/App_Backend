const express = require('express');
const {listRestaurants,listBrand,listProvince,listOrder} = require('../services/restaurants')

const router = express();

router.route("/").get(listRestaurants);
router.route("/list-brand").get(listBrand)
router.route("/list-province").get(listProvince)
router.route("/list-order").get(listOrder)

module.exports = router;