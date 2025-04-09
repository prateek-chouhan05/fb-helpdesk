const dotenv = require("dotenv");
const path = require("path");

let dotenvPath = `${path.dirname(__dirname)}/.env`;

dotenv.config({
  silent: true,
  path: dotenvPath,
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
};
