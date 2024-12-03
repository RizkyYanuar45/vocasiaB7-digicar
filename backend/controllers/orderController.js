const Order = require("../models/Order");
const Car = require("../models/Car");
const midtransHelper = require("../helper/midtrans");
const { uploadDocuments } = require("../middlewares/upload");
const nodemailer = require("nodemailer");

exports.createOrder = async (req, res) => {
  uploadDocuments(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { car, name, contact, startDate, endDate, destination } = req.body;

      if (!req.files || !req.files.KTP || !req.files.STNK) {
        return res.status(400).json({
          message: "KTP dan STNK wajib diunggah!",
        });
      }

      const documents = {
        KTP: req.files.KTP[0].path,
        STNK: req.files.STNK[0].path,
      };

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

      const newOrder = new Order({
        car,
        name,
        contact,
        startDate,
        endDate,
        destination,
        documents,
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

const sendCancellationEmail = async (contact, orderId) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "digicar12345@gmail.com",
        pass: "Digicar12345@#",
      },
    });

    const mailOptions = {
      from: "digicar@gmail.com",
      to: contact,
      subject: "Pesanan Anda Dibatalkan",
      text: `Pesanan dengan ID ${orderId} telah dibatalkan. Kami mohon maaf atas ketidaknyamanan ini.`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email pemberitahuan pembatalan berhasil dikirim!");
  } catch (error) {
    console.error("Gagal mengirim email pemberitahuan pembatalan:", error.message);
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id).populate("car");
    if (!order)
      return res.status(404).json({ message: "Pesanan tidak ditemukan!" });

    order.status = status;

    if (status === "Cancelled") {
      await sendCancellationEmail(order.contact, order._id);
    }

    await order.save();
    res.status(200).json({ message: "Update status pesanan berhasil!", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal mengupdate status pesanan!",
      error: error.message,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order)
      return res.status(404).json({ message: "Pesanan tidak ditemukan!" });

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
      message:
        "Parameter transaksi tidak valid. Pastikan gross_amount adalah angka dan item adalah string.",
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
