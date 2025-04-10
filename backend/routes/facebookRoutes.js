// routes/facebook.js
const express = require("express");
const router = express.Router();
const facebookController = require("../controllers/facebookController");
const authenticateUser = require("../middlewares/authMiddleware");

router.get(
  "/status",
  authenticateUser,
  facebookController.getFacebookStatus
);
router.delete(
  "/disconnect",
  authenticateUser,
  facebookController.disconnectFacebook
);

router.get("/auth", facebookController.facebookAuth);
router.get("/auth/callback", facebookController.facebookCallback);


module.exports = router;
