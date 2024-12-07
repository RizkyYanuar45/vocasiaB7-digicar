const Order = require("../models/Order");
const Car = require("../models/Car");
const fs = require("fs");
const midtransHelper = require("../helper/midtrans");
const sendEmail = require("../utils/sendMail");

exports.createOrder = async (req, res) => {
  try {
    const { car, name, contact, startDate, endDate, destination } = req.body;

    const files = req.files;
    const ktp = files?.KTP?.[0]?.path;
    const stnk = files?.STNK?.[0]?.path;

    if (!ktp || !stnk) {
      return res.status(400).json({
        message: "KTP dan STNK wajib diunggah!",
      });
    }

    const carData = await Car.findById(car);
    if (!carData) {
      return res.status(404).json({ message: "Mobil tidak ditemukan!" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return res.status(400).json({
        message: "Tanggal mulai harus lebih awal dari tanggal selesai!",
      });
    }

    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = carData.pricePerDay * duration;

    const midtransOrderId = `ORDER-${Date.now()}`;

    const newOrder = new Order({
      car,
      name,
      contact,
      startDate,
      endDate,
      destination,
      ktp,
      stnk,
      totalPayment: totalPrice,
      status: "Pending", 
      midtransOrderId, 
    });

    await newOrder.save();

    res.status(201).json({
      message: "Pesanan berhasil dibuat! Silakan lanjutkan pembayaran.",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error saat membuat pesanan:", error);
    res.status(500).json({
      message: "Pesanan gagal dibuat!",
      error: error.message,
    });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("car");
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal mendapatkan data pesanan!",
      error: error.message,
    });
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
    res.status(500).json({
      message: "Gagal mendapatkan data pesanan!",
      error: error.message,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status harus disertakan!" });
    }

    if (!["Pending", "Confirmed", "Completed", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Status tidak valid!" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Pesanan tidak ditemukan!" });
    }

    order.status = status;

    if (status === "Confirmed") {
      order.paymentStatus = "Belum Bayar"; 
    }

    await order.save();

    if (status === "Cancelled") {
      const emailContent = `Pesanan Anda dengan ID ${order._id} telah dibatalkan. Mohon hubungi kami jika ada pertanyaan.`;
      try {
        await sendEmail(order.contact, "Pesanan Anda Dibatalkan", emailContent);
      } catch (emailError) {
        console.error("Gagal mengirim email:", emailError);
        return res.status(500).json({ message: "Gagal mengirim notifikasi email", error: emailError.message });
      }
    }

    res.status(200).json({
      message: "Update status pesanan berhasil!",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal memperbarui status pesanan!", error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id); 
    if (!order) {
      return res.status(404).json({ message: "Pesanan tidak ditemukan!" });
    }

    res.status(200).json({ message: "Pesanan berhasil dihapus!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal menghapus pesanan!",
      error: error.message,
    });
  }
};


exports.orderPayment = async (req, res) => {
  const { orderId } = req.body; 

  if (!orderId) {
    return res.status(400).json({
      success: false,
      message: "Order ID tidak ditemukan",
    });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Pesanan tidak ditemukan",
      });
    }

    const snapTransaction = await midtransHelper.userPayment(
      order.totalPayment,
      order.midtransOrderId
    );

    return res.status(200).json({
      success: true,
      transaction_url: snapTransaction.redirect_url,
      order_id: order.midtransOrderId,
      item_name: order.car, 
    });
  } catch (error) {
    console.error("Error creating transaction:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Terjadi kesalahan saat memproses transaksi",
    });
  }
};
