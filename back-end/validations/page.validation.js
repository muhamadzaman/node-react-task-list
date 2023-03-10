const {check, validationResult} = require('express-validator');
const errorTypes = require('../constants/error.constants');
const { sendError } = require("../helpers/responses/response");

exports.validatePageStore = [
    check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Page name is required')
    .bail(),

    (req, res, next) => {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty())
        return sendError(res, '', errors.array(), [], errorTypes.VALIDATION_ERROR);
        next();
    },
]