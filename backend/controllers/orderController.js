const Order = require("../models/Order");
const Car = require("../models/Car");
const midtransClient = require("midtrans-client");

// Konfigurasi Midtrans
const snap = new midtransClient.Snap({
  isProduction: false, 
  serverKey: "YOUR_SERVER_KEY", 
});

exports.createOrder = async (req, res) => {
  try {
    const {
      car,
      name,
      contact,
      startDate,
      endDate,
      destination,
      documents,
      paymentProof,
      quantity,
    } = req.body;

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

    // Midtrans
    const transactionParams = {
      transaction_details: {
        order_id: `ORDER-${newOrder._id}`, 
        gross_amount: totalPrice,
      },
      customer_details: {
        first_name: name,
        email: contact,
        phone: contact, 
      },
      item_details: [
        {
          id: car,
          price: carData.pricePerDay,
          quantity,
          name: carData.name,
        },
      ],
    };

    const transaction = await snap.createTransaction(transactionParams);

    res.status(201).json({
      message: "Pesanan berhasil dibuat! Silakan lanjutkan pembayaran.",
      order: newOrder,
      token: transaction.token, 
    });
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
