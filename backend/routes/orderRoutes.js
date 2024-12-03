const express = require("express");
const { protect, admin } = require("../middlewares/authMiddleware");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  orderPayment,
} = require("../controllers/orderController");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/", protect, admin, getAllOrders);
router.get("/:id", getOrderById);
router.post(
  "/",
  upload.fields([
    { name: "paymentProof", maxCount: 1 },
    { name: "documents", maxCount: 2 },
  ]),
  createOrder
);
router.put("/:id/status", protect, admin, updateOrderStatus);
router.delete("/:id", protect, admin, deleteOrder);
router.post("/payment", orderPayment);
router.post("/payment/notification", (req, res) => {
  console.log("Midtrans notifikasi:", req.body);
  res.status(200).json({
    message: "Pembayaran berhasil diterima",
  });
});

module.exports = router;
