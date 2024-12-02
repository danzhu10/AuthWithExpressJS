const { verifyToken } = require('../utils/jwt')

const userAuth = async(req, res, next) => {
    try {
        if (!req.headers.authorization){
            return res.status(403).send({code: 403,status:false, message: 'Tidak diizinkan'});
        }
        const auth = verifyToken(req.headers.authorization.split(' ')[1]);
        if (auth == null || auth == undefined) {
            return res.status(403).send({code: 403,status:false, message: 'Tidak diizinkan'});
        }
        req.user = auth
        next()
    } catch (error) {
        console.log(error);
        return res.status(403).send({code: 403,status:false, message: 'Format token salah', error: error});
    }
}

module.exports = { userAuth }
