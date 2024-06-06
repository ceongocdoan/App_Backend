const User = require('../models/user');
const catchAsync = require('../pkg/catchAsync');
const ErrorHandler = require('../pkg/errors');
const {storage,get, del} = require('../config/redis');


exports.signupUser = catchAsync(async (req, res, next) => {
    if (!req.body || !req.body.name || !req.body.phone || !req.body.username || !req.body.password) {
        return res.status(400).json({ error: 'Missing or invalid request body' });
      }
    const { name, phone, username, password } = req.body;

    const user = await User.findOne({
        $or: [{ phone }, { username }]
    });
    if (user) {
        if (user.username === username) {
            return res.status(401).json(new ErrorHandler("Username already exists")).toJSON();
        }
        return res.status(401).json(new ErrorHandler("Phone already exists", 401));
    }

    const newUser = await User.create({
        name,
        phone,
        username,
        password,
    })
    newUser.token = user.generateToken();
    await storage(newUser._id.toHexString(), newUser.token);
    res.status(201).json(newUser);
});

exports.loginUser = catchAsync(async (req, res, next) => {

    const { userId, password } = req.body;

    const user = await User.findOne({
        $or: [{ email: userId }, { username: userId }]
    }).select("+password");

    if (!user) {
        return res.status(401).json(new ErrorHandler("User doesn't exist", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(401).json(new ErrorHandler("Password doesn't match", 401));
    }
    user.token = user.generateToken();
    await storage(user._id.toHexString(), user.token);
    res.status(201).json(user);
});

exports.logoutUser = catchAsync(async (req, res, next) => {
    const { userId } = req.user;
    res.status(200).json({ message: "Logged out successfully" });
});