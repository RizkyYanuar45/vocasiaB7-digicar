const express = require('express');
const { protect, admin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
const { addTestimoni, getTestimoni, updateTestimoni, deleteTestimoni } = require('../controllers/testimoniController');

const router = express.Router();

router.get('/', getTestimoni);
router.post('/', protect, admin, upload.single('image'), addTestimoni);
router.put('/:id', protect, admin, upload.single('image'), updateTestimoni);
router.delete('/:id', protect, admin, deleteTestimoni);

module.exports = router;
