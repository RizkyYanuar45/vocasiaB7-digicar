const express = require("express");
const { updateContact } = require("./../controllers/contactController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.put("/", protect, admin, updateContact);

module.exports = router;
