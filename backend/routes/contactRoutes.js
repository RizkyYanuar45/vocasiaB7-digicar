const express = require("express");
const router = express.Router();
const contactController = require("./../controllers/contactController");
const { protect, admin } = require("./../middlewares/authMiddleware");

router.get("/", protect, admin, contactController.getContact);
router.put("/", protect, admin, contactController.updateContact);

module.exports = router;
