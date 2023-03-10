/**
 * PostgreSQL configuration.
 */

"use strict";

require("dotenv").config();

const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
try {
  sequelize
    .authenticate()
    .then((r) =>
      console.log(
        "INFO: Connection to database has been established successfully."
      )
    );
} catch (err) {
  console.log("ERROR: Unable to connect to the database - ", err);
}

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
