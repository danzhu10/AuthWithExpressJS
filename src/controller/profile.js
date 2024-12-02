const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/constantConfig');
const { InternalServerError, Ok } = require("../utils/httpStatus");
const { findUnique, updateOne } = require('../repository/baseRepository');
const { userTable } = require('../utils/prismaSchema');

const getProfileByToken = async(req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, jwtSecret);
        let userParams = {
            where: {
                id: decoded.id
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                level: true,
                address: true,
                image_user: true,
                created_at: true
            }
        }
        let data = await findUnique(userTable, userParams);
        data.id = Number(data.id)
        return res.jsond(Ok, Ok, true, "success get profile", data);
    } catch (error) {
        console.log(error);
        return res.jsond(InternalServerError, InternalServerError,false, "Something went wrong");
    }
}

const editProfileById = async(req, res) => {
    try {
        let body = req.body; //name, address, phone 
        let paramsId = req.params.user_id;
        delete body.password;
        let params = {
            id: Number(paramsId),
            updateData: body
        }
        await updateOne(userTable, params);
        return res.jsond(Ok, Ok, true, "success edit profile");
    } catch (error) {
        console.log(error);
        return res.jsond(InternalServerError, InternalServerError,false, "Something went wrong");
    }
}

module.exports = { getProfileByToken, editProfileById }