const express = require('express');
const { protect, admin } = require('../middlewares/authMiddleware');
const { createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder } = require('../controllers/orderController');

const router = express.Router();

router.get('/', protect, admin, getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id/status', protect, admin, updateOrderStatus);
router.delete('/:id', protect, admin, deleteOrder);

module.exports = router;
