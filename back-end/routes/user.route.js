const Router = require("express").Router();
const UserController = require("../controllers/user.controller");

Router.route("/:googleId").get(UserController.GetUserByGoogleId);
Router.route("/:userId/token/:token").get(UserController.GetToken);

module.exports = Router;
