require("dotenv").config();
const sendEmail = require("../util/sendEmail");
const models = require("../models");
const crypto = require("crypto");

module.exports = {
  async sendEmailWithTokenAndUserId(user) {
    try {
      let token = {
        user_id: user.Id,
        token: crypto.randomBytes(32).toString("hex"),
      };
      await models.token.create(token);
      let url;
      let emailSent;
      if (!user.active) {
        url = `${process.env.CLIENT_URL}/auth/signup/confirmation/user/${user.Id}/token/${token.token}`;
        emailSent = await sendEmail(
          user.email,
          "[Moore Exoctics] Please Confirm Your E-mail Address",
          `Hello from MooreExoctics!
                      The user ${user.name} has signed up with your email address. Please confirm this by clicking the link : ${url}`
        );
      } else {
        url = `${process.env.CLIENT_URL}/auth/confirmation/user/${user.Id}/token/${token.token}`;
        emailSent = await sendEmail(
          user.email,
          "[Moore Exoctics] Reset Password Verification",
          `Hello from MooreExoctics!
                      Reset the password of ${user.name} by clicking the link : ${url}`
        );
      }

      //const url = `http://localhost:8800/api/v1/auth/${user.Id}/token/${token.token}`;

      if (emailSent.messageId) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
