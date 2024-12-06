const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  midtransOrderId: { type: String, default: "" },
  name: { type: String, required: true },
  contact: {
    type: String,
    required: true,
    match: [
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Berikan email yang benar!",
    ],
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  destination: { type: String, required: true },
  ktp: { type: String, required: true },
  stnk: { type: String, required: true },
  totalPayment: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
