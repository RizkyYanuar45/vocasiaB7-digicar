// routes/carRoutes.js
const express = require('express');
const { protect, admin } = require('../middlewares/authMiddleware');
const { addCar, getCars, getCarById, updateCar, deleteCar } = require('../controllers/carController');

const router = express.Router();

router.get('/', protect, getCars);
router.get('/:id', protect, getCarById);
router.post('/', protect, admin, addCar);
router.put('/:id', protect, admin, updateCar);
router.delete('/:id', protect, admin, deleteCar);

module.exports = router;
