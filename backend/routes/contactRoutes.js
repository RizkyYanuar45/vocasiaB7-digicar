const express = require("express");
const { updateContact, getAllContacts, createContact } = require("./../controllers/contactController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

// Rute untuk membuat kontak baru (hanya admin)
router.post("/", protect, admin, createContact);

// Rute untuk memperbarui kontak (hanya admin)
router.put("/:id", protect, admin, updateContact);

// Rute untuk mendapatkan semua kontak (tanpa perlu autentikasi)
router.get("/", getAllContacts);

module.exports = router;
