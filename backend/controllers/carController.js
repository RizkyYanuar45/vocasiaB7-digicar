const Car = require('../models/Car');
const fs = require('fs');

exports.addCar = async (req, res) => {
  try {
    const { file, body } = req;
    if (file) {
      body.image = file.path;
    }
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (req.file) {
      updates.image = req.file.path;
    }

    const carImage = await Car.findById(id).select('image');
    if (carImage) {
      fs.unlinkSync(carImage.image);
    }
    const car = await Car.findByIdAndUpdate(id, updates, { new: true });
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findByIdAndDelete(id);
    if (car) {
      if (car.image) {
        fs.unlinkSync(car.image);
      }
      res.json({ message: 'Car deleted' });
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
