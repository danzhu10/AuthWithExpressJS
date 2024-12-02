const nodemailer = require('nodemailer');
const { InternalServerError, Ok, badRequest } = require("../utils/httpStatus");
const { userEmail, userPassword } = require('../config/constantConfig');
const { findFirst, updateOne } = require( '../repository/baseRepository');
const { userLogTokenTable, userTable } = require( '../utils/prismaSchema');

const sendEmail = (params) => {
      const transporter = nodemailer.createTransport({
        host: 'mail.tlhjaya.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: userEmail,
          pass: userPassword,
        },
      });

      const { to, subject, text } = params;

      const mailOptions = {
        from: userEmail,
        to,
        subject,
        text
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
          return false
        }
        console.log('Email sent:', info.response);
        return true
      });
}

const verifyAfterRegist = async(req, res) => {
    try {
        let tokenParams = {
            where: {
              token: req.query.token_regist
            }
        }
        const findToken = await findFirst(userLogTokenTable, tokenParams);
        if(findToken == null) return res.jsond(badRequest, badRequest, false, "invalid token");
        let userParams = {
            id: findToken.user_id,
            updateData: {
                email_verified_at: new Date()
            }
        }
        await updateOne(userTable, userParams);
        return res.jsond(Ok, Ok, true, "verification success");
    } catch (error) {
        console.log(error);
        return res.jsond(InternalServerError, InternalServerError,false, "Something went wrong");
    }
}

module.exports = { sendEmail, verifyAfterRegist }