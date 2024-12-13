const express = require("express");
const router = express.Router();
const contactController = require("./../controllers/contactController");
const { protect, admin } = require("./../middlewares/authMiddleware");

router.get("/", contactController.getContact);
router.put("/:id", protect, admin, contactController.updateContact);

module.exports = router;
