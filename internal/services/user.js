const User = require('../models/user');
const catchAsync = require('../pkg/catchAsync');
const ErrorHandler = require('../pkg/errors');
const {storage,get, del} = require('../config/redis');


exports.signupUser = catchAsync(async (req, res, next) => {
    if (!req.body || !req.body.name || !req.body.phone || !req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Missing or invalid request body' });
      }
    const { name, phone, email, password } = req.body;

    const user = await User.findOne({
        $or: [{ phone }, { email }]
    });
    if (user) {
        if (user.email === email) {
            return res.status(401).json(new ErrorHandler("Email already exists")).toJSON();
        }
        return res.status(401).json(new ErrorHandler("Phone already exists", 401));
    }

    const newUser = await User.create({
        name,
        phone,
        email,
        password,
    })
    token = newUser.generateToken();
    await storage(newUser._id.toHexString(), token);
    res.status(201).json({
        newUser,
        "token":token,
});
});

exports.loginUser = catchAsync(async (req, res, next) => {

    const { email, password } = req.body;

    const user = await User.findOne({
         email
    }).select("+password");

    if (!user) {
        return res.status(401).json(new ErrorHandler("User doesn't exist", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(401).json(new ErrorHandler("Password doesn't match", 401));
    }
    token = user.generateToken();
    await storage(user._id.toHexString(), token);
    res.status(201).json({user,
        "token":token,
    });
});

exports.logoutUser = catchAsync(async (req, res, next) => {
    const { userId } = req.user;
    res.status(200).json({ message: "Logged out successfully" });
});

exports.getUsers = async (req, res, next) => {
    const users = await User.find({
        "_id":req.user.id
    });
    res.status(200).json(users);
};