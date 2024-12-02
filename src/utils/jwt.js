const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/constantConfig'); 

exports.verifyToken = (token) => {
    return jwt.verify(token, jwtSecret);
}