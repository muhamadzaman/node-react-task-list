const errorTypes = require("../constants/error.constants");
const { sendError } = require("../helpers/responses/response");
const  jwt =  require("jsonwebtoken");

module.exports =  {
    checkAuth(req, res, next) {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const _token = authHeader.split(' ')[1];

            jwt.verify(_token, process.env.JWT, (err, user) => {
                if (err) {
                    return sendError(res, 'Invalid Token', {}, {}, errorTypes.INVALID_TOKEN, 403)
                }

                req.auth = user;
                next();
            });
        } else {
            return sendError(res, 'Unauthenticated', {}, {}, errorTypes.UN_AUTHTICATED_USER, 401)
        }
    }
}