const mongoose = require("mongoose");

const NotifSchema = new mongoose.Schema({
  notifOrderId: { type: String, required: true },
  transactionStatus: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notif", NotifSchema, "Notif");
