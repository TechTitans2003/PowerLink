const express = require('express');
const {
    createUser,
    loginUser,
    updateUser,
    getUser,
    getDeviceForSingleUser,
    logoutUser,
    getUserInfo,
    getAnalytics
} = require('../controllers/auth-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const validate = require('../middlewares/validator-middleware');
const { signupSchema, loginSchema } = require('../validators/auth-validator');
const { getDeviceInfo } = require('../controllers/device-controller');

const router = express.Router();

router.route('/register').post(validate(loginSchema), createUser);

router.route('/login').post(validate(loginSchema), loginUser);

router.route('/user/info').get(authMiddleware, getUserInfo);

router.route('/user/dashboard').get(authMiddleware, getUser);

router.route('/user/device').get(authMiddleware, getDeviceForSingleUser);

router.route("/user/device/:id/info").get(authMiddleware, getDeviceInfo);

router.route("/user/analytics").get(authMiddleware, getAnalytics);

router.route("/logout").get(logoutUser);

router.route('/user/update').patch(authMiddleware, updateUser);

module.exports = router;