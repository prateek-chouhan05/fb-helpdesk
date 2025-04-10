const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { registerSchema, loginSchema } = require("../validators/userSchemas");
const validateSchema = require("../middlewares/validateMiddleware");
const authenticateUser = require("../middlewares/authMiddleware");

router.post(
  "/register",
  validateSchema(registerSchema),
  authController.register
);
router.post("/login", validateSchema(loginSchema), authController.login);
router.get("/me", authenticateUser, authController.me);

module.exports = router;
