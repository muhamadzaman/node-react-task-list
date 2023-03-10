const { compareSync } = require("bcrypt");
const { sequelize } = require("sequelize");
const errorTypes = require("../constants/error.constants");
const errorMessages = require("../constants/errorMessages.constants");
const {
  sendSuccess,
  sendError,
  sendCatchedError,
} = require("../helpers/responses/response");
const models = require("../models");

module.exports = {
  async getAllPages(req, res) {
    try {
      const pages = await models.pages.findAll({
        order: [["created_at", "DESC"]],
        // attributes: ["Id", "name", "created_at", "updated_at"],
        where: {
          userId: req.auth.Id,
        },
        include: [
          {
            model: models.fields,
          },
        ],
      });
      sendSuccess(res, "", pages);
    } catch (err) {
      sendCatchedError(res, "", err, {});
    }
  },

  async updatePage(req, res) {
    try {
      let page = await models.pages.findOne({
        where: {
          userId: req.auth.Id,
          Id: req.params.id,
        },
      });

      if (page) {
        page.set({
          name: req.body.name,
        });
        page = await page.save();
        sendSuccess(res, "Page updaetd.", page);
      } else {
        sendError(
          res,
          errorMessages[errorTypes.RECORD_NOT_FOUND],
          {},
          {},
          errorTypes.RECORD_NOT_FOUND
        );
      }
    } catch (err) {
      sendError(res, "", err, {}, err.constructor.name);
    }
  },

  async deletePage(req, res) {
    try {
      let page = await models.pages.findOne({
        where: {
          userId: req.auth.Id,
          Id: req.params.id,
        },
      });

      if (page) {
        //   page.set({
        //     name: req.body.name,
        // });
        page = await page.destroy();
        sendSuccess(res, "Page deleted.", page);
      } else {
        sendError(
          res,
          errorMessages[errorTypes.RECORD_NOT_FOUND],
          {},
          {},
          errorTypes.RECORD_NOT_FOUND
        );
      }
    } catch (error) {
      sendCatchedError(res, "", error, {});
    }
  },

  async createPage(req, res) {
    try {
      //create new page
      const newPage = {
        name: req.body.name,
        userId: req.auth.Id,
      };

      const page = await models.pages.create(newPage);

      if (page) {
        sendSuccess(res, "", page);
      } else {
        sendError(
          res,
          "Unable to create page, please try again",
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

  async getAllFieldsByPage(req, res) {
    try {
      const fields = await models.pages.findOne({
        where: {
          Id: req.params.pageId,
          userId: req.auth.Id,
        },
        attributes: ["Id", "name", "created_at", "updated_at"],
        include: [
          {
            model: models.fields,
            attributes: ["Id", "name", "sort_order"],
          },
        ],
      });
      sendSuccess(res, "", fields);
    } catch (err) {
      // res.json({ Error: err });
      sendCatchedError(res, "", err, {});
    }
  },
};
