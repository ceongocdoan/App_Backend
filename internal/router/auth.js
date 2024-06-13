const express = require('express');
const {signupUser,loginUser,logoutUser,getUsers} = require('../services/user')
const {verifyAccessToken} = require('../middlewares/middlewares')

const router = express();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyAccessToken,logoutUser);
router.route("/session").get(verifyAccessToken,getUsers);

module.exports = router;