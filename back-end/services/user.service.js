require("../config/postgresql");
const models = require("../models");

module.exports = {
  async GetUserByEmail(email) {
    try {
      const user = await models.user.findOne({
        where: { email: email },
        raw: true,
      });
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },
};
