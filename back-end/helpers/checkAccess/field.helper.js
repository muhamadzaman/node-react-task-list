const models = require("../../models");

module.exports = {

    async checkFieldAccessForUser(fieldId, pageId, userId) {
        return await models.pages.findOne({
            where: {
              userId: userId,
              Id: pageId,
            },
            include: [
                {
                  model: models.fields,
                  where: {
                      Id: fieldId,
                  }
                },
              ],
          })
    },
    
};