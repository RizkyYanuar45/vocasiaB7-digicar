const express = require("express");
const { protect, admin } = require("../middlewares/authMiddleware");
const {
  addCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  productPayment,
} = require("../controllers/carController");
const { upload } = require("../middlewares/upload");

const router = express.Router();

router.get("/", getCars);
router.get("/:id", getCarById);
router.post("/", protect, admin, upload.single("image"), addCar);
router.put("/:id", protect, admin, upload.single("image"), updateCar);
router.delete("/:id", protect, admin, deleteCar);
router.post("/payment", productPayment);
router.post("/payment/notification", (req, res) => {
  res.status(200).json({
    message: "pembayaran berhasil diterima",
  });
});

module.exports = router;
