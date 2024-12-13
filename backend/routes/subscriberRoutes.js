const express = require("express");
const {
  addSubscriber,
  getSubscribers,
  removeSubscriber,
} = require("../controllers/subscriberController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", addSubscriber);
router.get("/", protect, admin, getSubscribers);
router.delete("/:email", protect, admin, removeSubscriber);

module.exports = router;
