require("dotenv").config();
const Router = require("express").Router();
const passport = require("passport");
const AuthController = require("../controllers/auth.controller");
const { validateSignUp, validateLogin } = require("../validations/user.validation");

//=============================================================
//Register Login ForgetPassword ResetPassword ConfirmationAfterVerifyingEmail
Router.route("/register").post(validateSignUp, AuthController.Register);

Router.route("/login").post(validateLogin, AuthController.Login);

Router.route("/login/forgetpassword").post(AuthController.ForgetPassword);
Router.route("/resetpassword").patch(AuthController.ResetPassword);

Router.route("/:id/token/:token/").get(AuthController.VerifyByEmail);

//=============================================================
// For google authentication
Router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
Router.route("/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: `/social/failed`,
  }),
  AuthController.GoogleCallBack
);
//FaceBook Authentication
Router.route("/facebook").get(
  passport.authenticate("facebook", {
    scope: ["profile", "email"],
  })
);
Router.route("/facebook/callback").get(
  passport.authenticate("facebook", {
    failureRedirect: `/social/failed`,
  }),
  AuthController.FacebookCallBack
);

Router.route("/social/success").get(AuthController.SocialSuccess);
Router.route("/register/social").post(AuthController.SocialRegister);

Router.route("/social/failed").get(AuthController.SocialFailed);
Router.route("/social/logout").get(AuthController.SocialLogout);

//=============================================================
module.exports = Router;
