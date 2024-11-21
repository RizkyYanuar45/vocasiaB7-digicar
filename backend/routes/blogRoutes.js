const express = require('express');
const { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, getBlogs); 
router.get('/:id', protect, getBlogById); 
router.post('/', protect, admin, createBlog); 
router.put('/:id', protect, admin, updateBlog); 
router.delete('/:id', protect, admin, deleteBlog);

module.exports = router;
