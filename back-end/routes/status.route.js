const Router = require("express").Router();
const StatusController = require("../controllers/status.controller");

Router.route("/").get(StatusController.DBConnected);

module.exports = Router;
