require("dotenv").config();
require("../config/postgresql");
const models = require("../models");
const bcrypt = require("bcrypt");
const { createError } = require("../util/error");
const jwt = require("jsonwebtoken");
const { sendEmailWithTokenAndUserId } = require("../services/auth.service");
const { GetUserByEmail } = require("../services/user.service");
const { sendSuccess, sendError } = require("../helpers/responses/response");
const errorTypes = require("../constants/error.constants");

module.exports = {
  //Register
  async Register(req, res) {
    try {
      const userExist = await models.user.findOne({
        where: { email: req.body.email },
      });
      if (userExist) {
        // return res.status(400).json({ Error: "Email al" });
        return sendError(res, 'Email already exists', {}, {}, errorTypes.EMAIL_ALREADY_EXISTS);
      }

      //generate hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      //create new user
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      };

      const user = await models.user.create(newUser);
      const token = jwt.sign({ Id: user.Id }, process.env.JWT);
      user._token = token;
      res.cookie("access_token", token, { httpOnly: true });
      sendSuccess(res, '', user);
      // next();
    } catch (error) {
      return sendError(res, 'Something went Wrong', error, {}, error.constructor.name);
    }
  },
  //Login
  async Login(req, res) {
    try {
      const userExist = await models.user.findOne({
        where: { email: req.body.email },
      });
      if (!userExist) {
        return res.status(400).json({ Error: "User not Found" });
      }
      const user = userExist.dataValues;
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(400).json({ Error: "Wrong Password or Email" });
      }
      const token = jwt.sign({ Id: user.Id }, process.env.JWT);
      user._token = token;
      res.cookie("access_token", token, { httpOnly: true });
      sendSuccess(res, '', user);
    } catch (error) {
      res.status(500).json({ Error: "Internal Server Error" });
    }
  },
  //Email Verification
  async VerifyByEmail(req, res) {
    try {
      const user = await models.user.findOne({
        where: { Id: req.params.id },
        raw: true,
      });
      if (!user) return res.status(400).send({ message: "Invalid link" });

      //Find the token by getting token from params
      const token = await models.token.findOne({
        where: { user_id: user.Id, token: req.params.token },
        raw: true,
      });
      if (!token) return res.status(400).send({ message: "Invalid link" });

      //Update the user model and delete token
      if (user && token) {
        if (!user.active) {
          await models.user
            .update(
              { active: true },
              {
                where: { Id: user.Id },
                returning: true,
                plain: true,
                raw: true,
              }
            )
            .then(() => {
              console.log("User updated successfully");
            })
            .catch((error) => {
              console.log("Error on user update :", error);
            });
        }
        await models.token
          .destroy({ where: { token: token.token } })
          .then(() => {
            console.log("Token deleted successfully");
          })
          .catch((error) => {
            console.log("Token Error :", error);
          });
      }
      res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  //Forget Password
  async ForgetPassword(req, res) {
    try {
      console.log(req.body);
      const user = await GetUserByEmail(req.body.email);
      console.log(user);
      if (user) {
        const emailSent = await sendEmailWithTokenAndUserId(user);
        if (emailSent) {
          res
            .status(200)
            .send({ message: "An Email sent to your account please verify" });
        }
      }
    } catch (error) {
      res.status(404).json(error);
    }
  },
  //Reset Password
  async ResetPassword(req, res) {
    const user = await models.user.findOne({
      where: { Id: req.body.id },
      raw: true,
    });
    if (user) {
      //generate hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      await models.user
        .update(
          { password: hashedPassword },
          { where: { Id: user.Id }, returning: true, plain: true, raw: true }
        )
        .then(() => {
          res.status(200).send("User Password updated successfully");
          console.log("User Password updated successfully");
        })
        .catch((error) => {
          console.log("Error on user update :", error);
        });
    }
  },

  //For Google Authentication and Authorization
  //Social Register
  async SocialRegister(req, res) {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      active: true,
    };
    try {
      const user = await models.user.create(newUser);
      if (user) {
        const token = jwt.sign({ Id: user.Id }, process.env.JWT);
        const { password, ...otherDetails } = user.dataValues;
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json({ details: { ...otherDetails } });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
  //Google Callback
  async GoogleCallBack(req, res) {
    console.log("Google Call Back User: ", req.user);
    const user = await models.user.findOne({
      where: { password: req.user.password },
      raw: true,
    });
    console.log(user);
    if (user) {
      const token = jwt.sign({ Id: user.Id }, process.env.JWT);
      const { password, ...otherDetails } = user;
      console.log("Login");
      res.cookie("access_token", token, { httpOnly: true });
      res.redirect(`${process.env.CLIENT_URL}`);
    } else {
      console.log("SignUp");
      res.redirect(`${process.env.CLIENT_URL}/auth/register/social`);
    }
  },
  //Facebook Callback
  async FacebookCallBack(req, res) {
    console.log("Facebook CallBack User: ", req.user);
    const user = await models.user.findOne({
      where: { password: req.user.password },
      raw: true,
    });
    console.log(user);
    if (user) {
      const token = jwt.sign({ Id: user.Id }, process.env.JWT);
      const { password, ...otherDetails } = user;
      console.log("Login");
      res.cookie("access_token", token, { httpOnly: true });
      res.redirect(`${process.env.CLIENT_URL}`);
    } else {
      console.log("SignUp");
      res.redirect(`${process.env.CLIENT_URL}/auth/register/social`);
    }
  },
  //Get Data from Social
  async SocialSuccess(req, res) {
    if (req.user) {
      res.status(200).json({
        error: false,
        message: "Success",
        user: req.user,
      });
    } else {
      res.status(403).json({ error: true, message: "Not Authorized" });
    }
  },
  //Failed from Google Callback
  async SocialFailed(req, res) {
    res.status(401).json({
      error: true,
      message: "Failed: Sign up or Login with social",
    });
  },
  //Logout from Social
  async SocialLogout(req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect(process.env.CLIENT_URL);
    });
  },
};