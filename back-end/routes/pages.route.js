const Router = require("express").Router();
const PageController = require("../controllers/pages.controller");
const { checkAuth } = require("../middlewares/auth.middleware");
const { validatePageStore } = require("../validations/page.validation");

Router.route("/").get(checkAuth, PageController.getAllPages);
Router.route("/create").post(checkAuth, validatePageStore, PageController.createPage);
Router.route("/update/:id").patch(checkAuth, validatePageStore, PageController.updatePage);
Router.route("/delete/:id").delete(checkAuth, PageController.deletePage);

Router.route("/:pageId/fields").get(checkAuth, PageController.getAllFieldsByPage);

module.exports = Router;
