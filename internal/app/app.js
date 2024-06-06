require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const auth = require('../router/auth');
const restaurants = require('../router/restaurants')
const order = require('../router/order')

app.use(bodyParser.json()); 
app.use('/api/v1', auth);
app.use('/api/v1/restaurants',restaurants)
app.use('/api/v1/orders',order)

module.exports = app;