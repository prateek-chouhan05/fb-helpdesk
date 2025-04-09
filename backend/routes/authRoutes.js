const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validate } = require("jsonschema");
const { registerSchema, loginSchema } = require("../validators/userSchemas");

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

module.exports = router;
