const Sequelize = require("sequelize");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: "localhost",
      dialect: "mysql",
      port: 3001
    });

module.exports = sequelize;