const express = require('express');
const { protect, admin } = require('../middlewares/authMiddleware');
const { addTestimoni, getTestimoni, updateTestimoni, deleteTestimoni } = require('../controllers/testimoniController');

const router = express.Router();

router.get('/', getTestimoni);
router.post('/', protect, admin, addTestimoni);
router.put('/:id', protect, admin, updateTestimoni);
router.delete('/:id', protect, admin, deleteTestimoni);

module.exports = router;
