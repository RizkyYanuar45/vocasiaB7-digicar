const express = require("express");
const {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogCountByCategory,
} = require("../controllers/blogController");
const { protect, admin } = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/upload");

const router = express.Router();

router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);
router.post("/", protect, admin, upload.single("thumbnail"), createBlog);
router.put("/:id", protect, admin, upload.single("thumbnail"), updateBlog);
router.delete("/:id", protect, admin, deleteBlog);

module.exports = router;
