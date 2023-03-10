require("dotenv").config();
const { DB_UNAME, DB_PASSWORD, DB_HOST, DATABASE_NAME } = process.env;

module.exports = {
  development: {
    username: DB_UNAME,
    password: DB_PASSWORD,
    database: DATABASE_NAME,
    host: DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: DB_UNAME,
    password: DB_PASSWORD,
    database: DATABASE_NAME,
    host: DB_HOST,
    dialect: "postgres",
    migrationStorageTableName: "migrations", // Override default migration storage table name by define here
  },
  production: {
    username: DB_UNAME,
    password: DB_PASSWORD,
    database: DATABASE_NAME,
    host: DB_HOST,
    dialect: "postgres",
  },
};
