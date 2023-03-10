const models = require("../models");
module.exports = {
  //Get User By Google ID
  async GetUserByGoogleId(req, res) {
    const googleId = req.params.googleId;
    try {
      const userExist = await models.user.findOne({
        where: { password: googleId },
        raw: true,
      });
      console.log(userExist);
      if (!userExist) {
        res.status(404).json({ Error: "User not Found" });
        // return next(createError(404, "User not Found"));
      }
      const { password, ...otherDetails } = userExist;
      res.status(200).json({ user: { ...otherDetails } });
    } catch (err) {
      res.status(500).send("ERROR: Internal Server Error", err);
    }
  },
  //Get UserId And Token to handle multiple tokens
  async GetToken(req, res) {
    const userId = req.params.userId;
    const token = req.params.token;
    try {
      const tokenExist = await models.token.findOne({
        where: { user_id: userId, token: token },
        raw: true,
      });
      console.log(tokenExist);
      if (tokenExist) {
        res.status(200).json({ tokenExist });
      } else {
        res.status(404).json({ Error: "User Or token not Found" });
      }
    } catch (err) {
      res.status(500).json({ Error: "Internal Server Error" });
    }
  },
};
