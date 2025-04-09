require("dotenv").config();

module.exports = {
  development: {
    username: "admin",
    password: "password",
    database: "helpdesk",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
  },
};
