const Router = require("express").Router();
const AuthRouter = require("./auth.route");
const StatusRouter = require("./status.route");
const UserRouter = require("./user.route");
const PageRouter = require("./pages.route");
const FieldRouter = require("./fields.route");

Router.use("/auth", AuthRouter);
Router.use("/user", UserRouter);
Router.use("/fields", FieldRouter);
Router.use("/pages", PageRouter);
// Router.use("/status", StatusRouter);

module.exports = Router;
