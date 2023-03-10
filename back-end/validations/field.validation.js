const { check, validationResult } = require("express-validator");
const errorTypes = require("../constants/error.constants");
const { sendError } = require("../helpers/responses/response");

exports.validateFieldStore = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Field name is required")
    .bail(),
  check("pageId")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("pageId is required")
    .bail(),

  (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return sendError(
        res,
        "",
        errors.array(),
        [],
        errorTypes.VALIDATION_ERROR
      );
    next();
  },
];

exports.validateFieldUpdate = [
  check("pageId")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("pageId is required")
    .bail(),

  check("fieldId")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("fieldId is required")
    .bail(),

  check("sort_order")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("fieldId is required")
    .bail(),

  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Field name is required")
    .bail(),

  (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return sendError(
        res,
        "",
        errors.array(),
        [],
        errorTypes.VALIDATION_ERROR
      );
    next();
  },
];

exports.validateFieldUpdateAll = [
  check("fields").isArray(),

  check("fields.*.Id")
    .notEmpty()
    .isInt({ min: 1 })
    .not()
    .withMessage("Field id is required"),

  check("fields.*.name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Field name is required")
    .bail(),

  (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return sendError(
        res,
        "",
        errors.array(),
        [],
        errorTypes.VALIDATION_ERROR
      );
    next();
  },
];

exports.validateFieldDelete = [
  check("pageId")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("pageId is required")
    .bail(),

  check("fieldId")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("fieldId is required")
    .bail(),

  (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return sendError(
        res,
        "",
        errors.array(),
        [],
        errorTypes.VALIDATION_ERROR
      );
    next();
  },
];
