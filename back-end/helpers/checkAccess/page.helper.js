const models = require("../../models");

module.exports = {

    async checkPageAccessForUser(pageId, userId) {
        return await models.pages.findOne({
            where: {
              userId: userId,
              Id: pageId 
            },
            include: [
                {
                  model: models.fields,
                },
              ],
          })
    },
};