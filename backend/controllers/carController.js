const Car = require("../models/Car");
const fs = require("fs");
const midtransHelper = require("./../helper/midtrans");

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
      res.status(404).json({ message: "Car not found" });
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

    const carImage = await Car.findById(id).select("image");
    if (carImage) {
      fs.unlinkSync(carImage.image);
    }
    const car = await Car.findByIdAndUpdate(id, updates, { new: true });
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: "Car not found" });
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
      res.json({ message: "Car deleted" });
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.productPayment = async (req, res) => {
  let { gross_amount, item } = req.body;
  console.log(req.body);

  if (!gross_amount || !item) {
    return res.status(400).json({
      success: false,
      message: "Parameter transaksi tidak lengkap",
    });
  }

  gross_amount = Number(gross_amount);
  item = String(item);

  if (isNaN(gross_amount) || typeof item !== "string") {
    return res.status(400).json({
      success: false,
      message:
        "Parameter transaksi tidak valid. Pastikan gross_amount adalah angka dan item adalah string.",
    });
  }

  try {
    const snapMidtrans = await midtransHelper.userPayment(gross_amount, item);

    return res.status(200).json({
      success: true,
      transaction_url: snapMidtrans.redirect_url,
      order_id: snapMidtrans.order_id,
      item_name: snapMidtrans.item,
    });
  } catch (error) {
    console.error("Error creating transaction:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Terjadi kesalahan saat memproses transaksi",
    });
  }
};
