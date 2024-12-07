const mongoose = require("mongoose");

const testimoniSchema = new mongoose.Schema({
  user: { type: String, required: true },
  image: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

module.exports = mongoose.model("Testimoni", testimoniSchema);
