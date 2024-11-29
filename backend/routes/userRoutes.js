const express = require("express");
const {
  loginUser,
  addUser,
  findUser,
  editUser,
  deleteUser,
} = require("../controllers/userController");
const { protect, admin } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const router = express.Router();

router.post("/login", loginUser);
router.post("/", protect, admin, upload.single("image"), addUser);
router.get("/:id", protect, admin, findUser);
router.put("/:id", protect, admin, upload.single("image"), editUser);
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;
