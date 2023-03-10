const {check, validationResult} = require('express-validator');
const errorTypes = require('../constants/error.constants');
const { sendSuccess, sendError } = require("../helpers/responses/response");
exports.validateSignUp = [
check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),
    
check('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage('Invalid email address!')
    .bail(),

check('password')
    .not()
    .isEmpty()
    .withMessage('Password is required!')
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    
    return sendError(res, '', errors.array(), [], errorTypes.VALIDATION_ERROR);
    next();
  },
];

exports.validateLogin = [
    check('email')
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Invalid email address!')
    .bail(),

    check('password')
    .not()
    .isEmpty()
    .withMessage('Password is required!')
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    return sendError(res, '', errors.array(), [], errorTypes.VALIDATION_ERROR);
    next();
  },
]