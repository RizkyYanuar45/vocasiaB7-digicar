const express = require('express');
const { loginUser, addUser, findUser, editUser, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', loginUser);
router.post('/', protect, admin, addUser);
router.get('/:id', protect, admin, findUser);
router.put('/:id', protect, admin, editUser);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;
