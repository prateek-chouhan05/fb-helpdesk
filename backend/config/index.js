const dotenv = require("dotenv");
const path = require("path");

let dotenvPath = `${path.dirname(__dirname)}/.env`;

dotenv.config({
  silent: true,
  path: dotenvPath,
});

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  FB_REDIRECT_URI: process.env.FB_REDIRECT_URI,
  FB_APP_ID: process.env.FB_APP_ID,
  FB_APP_SECRET: process.env.FB_APP_SECRET,
};
