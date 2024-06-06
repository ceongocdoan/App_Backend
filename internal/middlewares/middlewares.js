const jwt = require('jsonwebtoken');
const {get} = require('../config/redis');

const verifyAccessToken = async (req, res, next) => {
    const authorizationHeader = req.get("Authorization");
    if (!authorizationHeader) {
        res.status(401).json({
            error: "Unauthorized",
            message: "Authorization header is missing"
        });
        return;
    }
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({
            error: "Unauthorized",
            message: "Token is missing"
        });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        tokenRedis = await get(decoded.id);
        if( token != tokenRedis) {
            res.status(401).json({
                error: "Unauthorized",
                message: "Token is invalid"
            });
            return;
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = {
    verifyAccessToken
}