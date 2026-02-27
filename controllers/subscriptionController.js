const Subscription = require("../model/Subscription");
const Plan = require("../model/Plan");
const mongoose = require("mongoose");

exports.subscribePlan = async (req, res) => {
  const plan = await Plan.findById(req.params.planId);
  if (!plan || !plan.isPublished)
    return res.status(400).json({ message: "Invalid Plan" });

  const subscription = await Subscription.create({
    user: req.user.id,
    plan: plan._id,
    amount: plan.price,
  });

  res.json(subscription);
};

exports.mockPayment = async (req, res) => {
  try {
    const { subId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(subId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Subscription ID",
      });
    }

    // Find subscription and populate plan
    const subscription = await Subscription.findById(subId).populate("plan");

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    // Amount check not needed — backend plan price se hi le rahe
    const amount = subscription.plan.price;

    // Update subscription
    subscription.status = "active";
    subscription.paymentId = "MOCK_" + Date.now();
    subscription.startDate = new Date();
    subscription.endDate = new Date(
      Date.now() + subscription.plan.duration * 24 * 60 * 60 * 1000
    );

    await subscription.save();

    res.status(200).json({
      success: true,
      message: `Payment successful for ₹${amount}`,
      data: subscription,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
