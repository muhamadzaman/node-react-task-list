const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

module.exports = {
  //DB Connected
  async DBConnected(req, res) {
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
          res
            .status(200)
            .send(
              "INFO: Connection to database has been established successfully."
            )
        );
    } catch (err) {
      res.status(500).send("ERROR: Unable to connect to the database - ", err);
    }
  },
};
