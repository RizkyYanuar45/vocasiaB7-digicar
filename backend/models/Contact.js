const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  tiktok: { type: String },
  instagram: { type: String },
  facebook: { type: String },
  youtube: { type: String },
  twitter: { type: String },
  linkedln: { type: String },
  admin_one: { type: String },
  admin_two: { type: String },
  email: { type: String },
});

module.exports = mongoose.model("Contact", ContactSchema);
