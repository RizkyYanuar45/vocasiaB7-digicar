const Order = require("../models/Order");
const Car = require("../models/Car");

exports.createOrder = async (req, res) => {
  try {
    const { car, name, contact, startDate, endDate, destination, documents, paymentProof } = req.body;

    const carData = await Car.findById(car);
    if (!carData) {
      return res.status(404).json({ message: "Mobil tidak ditemukan!" });
    }

    if (carData.stok <= 0) {
      return res.status(400).json({ message: "Mobil tidak tersedia!" });
    }

    carData.stok -= 1;
    await carData.save();

    const newOrder = new Order({
      car,
      name,
      contact,
      startDate,
      endDate,
      destination,
      documents,
      paymentProof,
    });

    await newOrder.save();
    res.status(201).json({ message: "Pesanan berhasil dibuat!", order: newOrder });
  } catch (error) {
    console.error(error);  
    res.status(500).json({ message: "Pesanan gagal terbuat!", error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("car");
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);  
    res.status(500).json({ message: "Pesanan tidak ditemukan!", error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("car");
    if (!order) return res.status(404).json({ message: "Pesanan tidak ditemukan!" });
    res.status(200).json({ order });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Pesanan tidak ditemukan!", error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id).populate("car");
    if (!order) return res.status(404).json({ message: "Pesanan tidak ditemukan!" });

    order.status = status;

    // Hitung denda jika status adalah: Completed
    if (status === "Completed") {
      const today = new Date();
      if (today > order.endDate) {
        const lateDays = Math.ceil((today - order.endDate) / (1000 * 60 * 60 * 24));
        order.lateFee = lateDays * 50000; // contoh denda 50k per hari
      }

      // Kembalikan stok mobil setelah selesai
      const car = await Car.findById(order.car);
      if (car) {
        car.stok += 1;
        await car.save();
      }
    }

    await order.save();
    res.status(200).json({ message: "Update status order berhasil!", order });
  } catch (error) {
    console.error(error);  
    res.status(500).json({ message: "Gagal mengupdate status order!", error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ message: "Pesanan tidak ditemukan!" });

    const car = await Car.findById(order.car);
    if (car) {
      car.stok += 1;
      await car.save();
    }

    res.status(200).json({ message: "Pesanan berhasil dihapus!" });
  } catch (error) {
    console.error(error);  
    res.status(500).json({ message: "Gagal menghapus pesanan!", error: error.message });
  }
};
