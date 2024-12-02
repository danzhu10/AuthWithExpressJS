const bcrypt = require('bcryptjs');
const { userLogTokenTable, userTable } = require('../utils/prismaSchema');
const { badRequest, Created, InternalServerError } = require('../utils/httpStatus');
const services = require('../repository/baseRepository');
const { sendEmail } = require('./emailVerification');
const { host } = require('../config/constantConfig');
const { generateRandomString } = require('../middleware/generateString');

const register = async(req, res) => {
    try {
        let body = req.body;
        let userParams = {
            email: body.email
        }
        
        if(body.phone.length<10)return res.jsond(badRequest, badRequest, false, "Phone less than 10 character");
        if(body.phone.length>10)return res.jsond(badRequest, badRequest, false, "Phone more than 10 character");
        
        const checkEmail = await services.findUnique(userTable, userParams);
        if(checkEmail != null) return res.jsond(badRequest, badRequest, false, "email already exist");
        const hashPassword = await bcrypt.hash(body.password, 10);
        body.password = hashPassword;
        body.created_at = new Date();
        const registerUser = await services.insertOne(userTable, body);
        let tokenRegist = generateRandomString(20);
        let userTokenParams = {
            token: tokenRegist,
            created_at: new Date(),
            user_id: registerUser.id
        }
        await services.insertOne(userLogTokenTable, userTokenParams);
        let emailParams = {
            to: body.email,
            subject: 'Verification',
            text: `Please click this link to to verify your email ${host}/verification/?token_regist=${tokenRegist}`
        }
        await sendEmail(emailParams);
        return res.jsond(Created, Created, true, "register success, please check your email");
    } catch (error) {
        console.log(error);
        return res.jsond(InternalServerError, InternalServerError,false, "Something went wrong");
    }
}

module.exports = { register }