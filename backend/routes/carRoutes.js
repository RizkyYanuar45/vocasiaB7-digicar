// routes/carRoutes.js
const express = require('express');
const { protect, admin } = require('../middlewares/authMiddleware');
const { addCar, getCars, getCarById, updateCar, deleteCar } = require('../controllers/carController');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/', getCars);
router.get('/:id', getCarById);
router.post('/', protect, admin, upload.single('image'), addCar);
router.put('/:id', protect, admin, upload.single('image'), updateCar);
router.delete('/:id', protect, admin, deleteCar);

module.exports = router;
