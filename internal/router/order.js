const express = require('express');
const {createOrder,listOrder} = require('../services/order')
const {verifyAccessToken} = require('../middlewares/middlewares')

const router = express();

router.route("/").post(verifyAccessToken,createOrder);
router.route("/").get(verifyAccessToken,listOrder);

module.exports = router;