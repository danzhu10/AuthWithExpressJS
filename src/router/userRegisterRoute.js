const express = require('express');
const { register } = require('../controller/userRegisterController')

var router = express.Router();

router
.route('/register')
.post(
    register
);

module.exports = { router }