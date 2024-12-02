const express = require('express');
const { 
    getProfileByToken, editProfileById
} = require('../controller/profile');
const { userAuth } = require('../middleware/auth');

var router = express.Router();

router
.route('/profile')
.get(
    userAuth,
    getProfileByToken
);

router
.route('/profile/:user_id')
.patch(
    userAuth,
    editProfileById
);

module.exports = { router }