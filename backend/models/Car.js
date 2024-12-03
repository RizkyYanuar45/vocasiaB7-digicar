const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  tahun: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  pricePerDay: { type: Number, required: true },
  image: { type: String, required: true },
  isUsed: { type: Boolean, enum: ["Ready", "Not Ready"] },
});

module.exports = mongoose.model("Car", carSchema);
