const express = require("express");
const {
  requestPasswordReset,
  resetPassword,
  approveAndProcessPayment,
  declineOrder,
  notificationAndUpdateOrder,
} = require("../controllers/authController");

const router = express.Router();

router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);
router.post("/approve", approveAndProcessPayment);
router.post("/decline", declineOrder);
router.post("/payment/notification", notificationAndUpdateOrder);

module.exports = router;
