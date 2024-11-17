const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { addTestimoni, getTestimoni, updateTestimoni, deleteTestimoni } = require('../controllers/testimoniController');

const router = express.Router();

router.get('/', getTestimoni);
router.post('/', protect, addTestimoni);
router.put('/:id', protect, updateTestimoni);
router.delete('/:id', protect, deleteTestimoni);

module.exports = router;
