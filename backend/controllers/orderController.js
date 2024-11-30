const Order = require("../models/Order");
const Car = require("../models/Car");
const midtransHelper = require("../helper/midtrans"); 
const { uploadDocuments } = require('../middlewares/upload'); 

exports.createOrder = async (req, res) => {
  uploadDocuments(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const {
        car,
        name,
        contact,
        startDate,
        endDate,
        destination,
        quantity,
      } = req.body;

      if (!req.files || !req.files.KTP || !req.files.STNK || !req.files.paymentProof) {
        return res.status(400).json({ message: "KTP, STNK, dan bukti pembayaran wajib diunggah!" });
      }

      const documents = {
        KTP: req.files.KTP[0].path,
        STNK: req.files.STNK[0].path,
      };
      const paymentProof = req.files.paymentProof[0].path;

      const carData = await Car.findById(car);
      if (!carData) {
        return res.status(404).json({ message: "Mobil tidak ditemukan!" });
      }

      if (carData.stok < quantity) {
        return res.status(400).json({ message: "Stok mobil tidak mencukupi!" });
      }

      carData.stok -= quantity;
      await carData.save();

      const totalPrice = carData.pricePerDay * quantity;

      const newOrder = new Order({
        car,
        name,
        contact,
        startDate,
        endDate,
        destination,
        documents,
        paymentProof,
        quantity,
        totalPayment: totalPrice,
        status: "Pending",
      });

      await newOrder.save();

      res.status(201).json({
        message: "Pesanan berhasil dibuat! Silakan lanjutkan pembayaran.",
        order: newOrder,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Pesanan gagal terbuat!", error: error.message });
    }
  });
};
  

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("car");
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mendapatkan data pesanan!", error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("car");
    if (!order) {
      return res.status(404).json({ message: "Pesanan tidak ditemukan!" });
    }
    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mendapatkan data pesanan!", error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id).populate("car");
    if (!order) return res.status(404).json({ message: "Pesanan tidak ditemukan!" });

    order.status = status;

    if (status === "Completed") {
      const today = new Date();
      if (today > order.endDate) {
        const lateDays = Math.ceil((today - order.endDate) / (1000 * 60 * 60 * 24));
        order.lateFee = lateDays * 50000; // Contoh denda 50k per hari
      }

      const car = await Car.findById(order.car);
      if (car) {
        car.stok += order.quantity;
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

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Pesanan tidak ditemukan!" });

    const car = await Car.findById(order.car);
    if (car) {
      car.stok += order.quantity;
      await car.save();
    }

    await order.remove();
    res.status(200).json({ message: "Pesanan berhasil dihapus!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menghapus pesanan!", error: error.message });
  }
};

exports.orderPayment = async (req, res) => {
    const { gross_amount, item } = req.body;
  
    if (!gross_amount || !item) {
      return res.status(400).json({
        success: false,
        message: "Parameter transaksi tidak lengkap",
      });
    }
  
    const amount = Number(gross_amount);
    const itemName = String(item);
  
    if (isNaN(amount) || typeof itemName !== "string") {
      return res.status(400).json({
        success: false,
        message: "Parameter transaksi tidak valid. Pastikan gross_amount adalah angka dan item adalah string.",
      });
    }
  
    try {
      const snapTransaction = await midtransHelper.userPayment(amount, itemName);
  
      return res.status(200).json({
        success: true,
        transaction_url: snapTransaction.redirect_url,
        order_id: snapTransaction.order_id,
        item_name: snapTransaction.item,
      });
    } catch (error) {
      console.error("Error creating transaction:", error.message);
  
      return res.status(500).json({
        success: false,
        message: error.message || "Terjadi kesalahan saat memproses transaksi",
      });
    }
  };
  