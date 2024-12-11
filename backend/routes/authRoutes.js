const express = require("express");
const {
  requestPasswordReset,
  resetPassword,
  approveAndProcessPayment,
  declineOrder,
  notification,
  checkPaymentOrder,
  deleteApprovedOrder,
} = require("../controllers/authController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);
router.post("/approve", protect, admin, approveAndProcessPayment);
router.post("/decline", protect, admin, declineOrder);
router.post("/check/:id", checkPaymentOrder);
router.post("/delete/:id", protect, admin, deleteApprovedOrder);
router.post("/payment/notification", notification);

module.exports = router;
