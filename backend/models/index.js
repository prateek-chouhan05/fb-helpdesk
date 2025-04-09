const { Sequelize, DataTypes } = require("sequelize");
const config =
  require("../config/config")[process.env.NODE_ENV || "development"];
const sequelize = new Sequelize(config);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Models
db.User = require("./user")(sequelize, DataTypes);

module.exports = db;
