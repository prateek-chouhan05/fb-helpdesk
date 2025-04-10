const jwt = require("jsonwebtoken");
const { User } = require("../models");
const logger = require("../utils/logger");
const { JWT_SECRET } = require("../config");

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "Missing auth header" });

    const token = authHeader.split(" ")[1]; // Bearer <token>
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    logger.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateUser;
