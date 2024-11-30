const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  car: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Car", 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  contact: { 
    type: String, 
    required: true 
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
  },
  destination: { 
    type: String, 
    required: true 
  },
  documents: { 
    KTP: { 
      type: String, 
      required: true 
    },
    STNK: { 
      type: String, 
      required: true 
    },
  },
  paymentProof: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"], 
    default: "Pending" 
  },
  lateFee: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model("Order", orderSchema);
