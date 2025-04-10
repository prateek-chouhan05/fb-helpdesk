const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const config =
  require("../config/config")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(config);
const basename = path.basename(__filename);

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => file !== basename && file.endsWith(".js"))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
