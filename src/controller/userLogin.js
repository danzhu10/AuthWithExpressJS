const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { userTable } = require("../utils/prismaSchema");
const { badRequest, InternalServerError, Ok } = require("../utils/httpStatus");
const { findUnique,updateOne } = require('../repository/baseRepository');
const { jwtExpiryTime, jwtSecret } = require('../config/constantConfig');

const login = async(req, res) => {
    try {
        let body = req.body;
        let userParams = {
            email: body.email
        }
        const checkEmail = await findUnique(userTable, userParams);
        if(checkEmail == null) return res.jsond(badRequest, badRequest, false, "email not found");
        if(checkEmail.email_verified_at == null) return res.jsond(badRequest, badRequest, false, "please verify your email first");
        let match = await bcrypt.compare(body.password, checkEmail.password);
        if(!match) return res.jsond(badRequest, badRequest, false, "wrong email / password");
        let userData = {
            id: Number(checkEmail.id),
            email: checkEmail.email
        }
        const signToken = jwt.sign(userData, jwtSecret, { expiresIn: jwtExpiryTime });
        userData.token = signToken;
        return res.jsond(Ok, Ok, true, "login success", userData);
    } catch (error) {
        console.log(error);
        return res.jsond(InternalServerError, InternalServerError,false, "Something went wrong");
    }
}

const changePassword = async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, jwtSecret);
        const { currentPassword, newPassword, retypeNewPassword } = req.body;
        let params = {
            id: decoded.id
        }
        if(newPassword != retypeNewPassword){
            return res.jsond(Ok, Ok, false, "New Password is not same with Retype Password");
        }

        const user = await findUnique(userTable, params);
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return res.jsond(Ok, Ok, false, "Invalid current password");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
    
        let userParams = {
            id: params.id,
            updateData: {
                password: hashedPassword,
            }
        }
        await updateOne(userTable, userParams);
        return res.jsond(Ok, Ok, true, 'Password changed successfully' );
    } catch (error) {
        console.error(error);
        return res.jsond(InternalServerError, InternalServerError,false, "Something went wrong");
    }
};

module.exports = { login, changePassword, logout }