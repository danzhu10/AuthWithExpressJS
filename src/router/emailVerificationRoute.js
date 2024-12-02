const express = require('express');
const { 
    verifyAfterRegist
} = require('../controller/emailVerification');

var router = express.Router();

router
.route('/')
.get(
    verifyAfterRegist
);

module.exports = { router }