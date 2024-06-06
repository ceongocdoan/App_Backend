const express = require('express');
const app = require('../internal/app/app');
const connectDatabase = require('../internal/config/mongo');
const {connectRedis} = require('../internal/config/redis');
const migrateData = require('../pkg/minio/minio');
const PORT = process.env.PORT || 3000;

connectDatabase();
connectRedis();
migrateData();

app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});