const express = require('express');
const { login, changePassword, logout } = require('../controller/userLogin');
const { userAuth } = require('../middleware/auth');

var router = express.Router();

router
.route('/login')
.post(
    login
);

router
.route('/change-password')
.post(
    userAuth,
    changePassword
);

module.exports = { router }