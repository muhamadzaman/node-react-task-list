const Router = require("express").Router();
const FieldController = require("../controllers/fields.controller");
const { checkAuth } = require("../middlewares/auth.middleware");
const {
  validateFieldStore,
  validateFieldUpdate,
  validateFieldDelete,
  validateFieldUpdateAll,
} = require("../validations/field.validation");

// Router.route("/").get(FieldController.getAllFields);
// Router.route("/page/:pageId").get(checkAuth, FieldController.getFieldsByPage);

Router.route("/create").post(
  checkAuth,
  validateFieldStore,
  FieldController.createField
);
Router.route("/update").patch(
  checkAuth,
  validateFieldUpdate,
  FieldController.updateField
);
Router.route("/update/all").patch(
  checkAuth,
  validateFieldUpdateAll,
  FieldController.bulkUpdate
);
Router.route("/delete/:fieldId").delete(
  checkAuth,
  validateFieldDelete,
  FieldController.deleteField
);

module.exports = Router;
