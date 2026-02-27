const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  amount: Number,
  status: {
    type: String,
    enum: ["pending", "active", "expired"],
    default: "pending",
  },
  startDate: Date,
  endDate: Date,
  paymentId: String,
}, { timestamps: true });

module.exports = mongoose.model("Subscription", subscriptionSchema);