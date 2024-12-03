const express = require("express");
const {
  requestPasswordReset,
  resetPassword,
  approveAndProcessPayment,
  declineOrder,
} = require("../controllers/authController");

const router = express.Router();

router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);
router.post("/approve", approveAndProcessPayment);
router.post("/decline", declineOrder);

module.exports = router;
