const { host, jwtSecret } = require("../config/constantConfig");
const jwt = require('jsonwebtoken');
const { updateOne } = require("../repository/baseRepository");
const { InternalServerError, Created } = require("../utils/httpStatus");
const { userTable } = require("../utils/prismaSchema");

const uploadImage = async(req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, jwtSecret);
        const sanitizedFilename = req.file.filename.replace(/\s/g, '');
        let params = {
            id: decoded.id,
            updateData: {
                image_user: `${host}/${sanitizedFilename}`
            }
        }
        await updateOne(userTable, params) //fix this
        return res.jsond(Created, Created, true, "success upload image", sanitizedFilename);
    } catch (error) {
        console.log(error);
        return res.jsond(InternalServerError, InternalServerError,false, "Something went wrong");
    }
}

module.exports = { uploadImage }