const express = require('express');
const { 
    uploadImage
} = require('../controller/uploadImage');
const { userAuth } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

var router = express.Router();

router
.route('/')
.post(
    userAuth,
    upload.single('image'),
    uploadImage
);

module.exports = { router }