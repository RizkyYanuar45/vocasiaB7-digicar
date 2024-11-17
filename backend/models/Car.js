const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  type: { type: String, required: true },
  plateType: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  pricePerDay: { type: Number, required: true },
});

module.exports = mongoose.model('Car', carSchema);
