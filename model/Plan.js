const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  duration: Number,
  isPublished: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("Plan", planSchema);