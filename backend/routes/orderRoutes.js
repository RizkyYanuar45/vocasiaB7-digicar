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
const { uploadDocuments } = require("../middlewares/upload");

const router = express.Router();

router.get("/", protect, admin, getAllOrders);
router.get("/:id", getOrderById);
router.post("/", uploadDocuments, createOrder);
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
