const { promises } = require("nodemailer/lib/xoauth2");
const { sequelize } = require("sequelize");
const errorTypes = require("../constants/error.constants");
const errorMessages = require("../constants/errorMessages.constants");
const {
  checkFieldAccessForUser,
} = require("../helpers/checkAccess/field.helper");
const {
  checkPageAccessForUser,
} = require("../helpers/checkAccess/page.helper");
const {
  sendSuccess,
  sendError,
  sendCatchedError,
} = require("../helpers/responses/response");
const models = require("../models");

module.exports = {
  async createField(req, res) {
    try {
      // check PageAccess
      const page = await checkPageAccessForUser(req.body.pageId, req.auth.Id);

      if (!page) {
        return sendError(
          res,
          errorMessages[errorTypes.RECORD_NOT_ACCESSIBLE],
          {},
          {},
          errorTypes.RECORD_NOT_ACCESSIBLE
        );
      }

      //create new Field
      const newField = {
        name: req.body.name,
        pageId: page.Id,
        sort_order: page.fields.length + 1,
      };

      const field = await models.fields.create(newField);
      if (field) {
        sendSuccess(res, "", field);
      } else {
        sendError(
          res,
          "Unable to create field, please try again",
          {},
          {},
          errorTypes.UNABLE_TO_STORE_DATA,
          200
        );
      }
    } catch (err) {
      sendCatchedError(res, "", err, {});
    }
  },

  async bulkUpdate(req, res) {
    try {
      const fields = req.body.fields;
      await Promise.all(
        fields.map(async (field) => {
          // check Field Access
          // /const page = await checkFieldAccessForUser(field.Id,  req.auth.Id);

          // if (page) {
          //   return sendError(
          //     res,
          //     errorMessages[errorTypes.RECORD_NOT_ACCESSIBLE],
          //     {},
          //     {},
          //     errorTypes.RECORD_NOT_ACCESSIBLE
          //   );
          // }

          await models.fields.update(
            {
              name: field.name,
              sort_order: field.sort_order,
            },
            {
              where: {
                Id: field.Id,
              },
            }
          );
        })
      );
      sendSuccess(res, "Fields updated.", {});
    } catch (error) {
      sendCatchedError(res, "", error, {});
    }
  },

  async updateField(req, res) {
    try {
      // check Field Access
      const page = await checkFieldAccessForUser(
        req.body.fieldId,
        req.body.pageId,
        req.auth.Id
      );
      console.log(page);

      if (!page) {
        return sendError(
          res,
          errorMessages[errorTypes.RECORD_NOT_ACCESSIBLE],
          {},
          {},
          errorTypes.RECORD_NOT_ACCESSIBLE
        );
      }

      let field = await models.fields.findOne({
        where: {
          Id: req.body.fieldId,
        },
      });
      field.set({
        name: req.body.name,
        sort_order: req.body.sort_order,
      });
      field = await field.save();
      sendSuccess(res, "Field updatd.", field);
    } catch (err) {
      sendCatchedError(res, "", err, {});
    }
  },

  async deleteField(req, res) {
    try {
      console.log(req.params.fieldId, req.query.pageId);
      // check Field Access
      const page = await checkFieldAccessForUser(
        req.params.fieldId,
        req.query.pageId,
        req.auth.Id
      );

      console.log("page: ", page);

      if (!page) {
        return sendError(
          res,
          errorMessages[errorTypes.RECORD_NOT_ACCESSIBLE],
          {},
          {},
          errorTypes.RECORD_NOT_ACCESSIBLE
        );
      }

      const result = await models.fields.destroy({
        where: {
          Id: req.params.fieldId,
        },
      });

      console.log("Result:", result);

      sendSuccess(res, "Field deleted.", {});
    } catch (err) {
      sendCatchedError(res, "", err, {});
    }
  },
};
