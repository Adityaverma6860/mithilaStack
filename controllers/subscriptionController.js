const Subscription = require("../model/Subscription");
const Plan = require("../model/Plan");

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
    const subscription = await Subscription.findById(req.params.subId)
      .populate("plan");

    if (!subscription)
      return res.status(404).json({ message: "Subscription not found" });

    //  amount plan se aayega
    if (subscription.plan.price !== req.body.amount) {
      return res.status(400).json({ message: "Amount Add" });
    }

    subscription.status = "active";
    subscription.paymentId = "MOCK_" + Date.now();
    subscription.startDate = new Date();
    subscription.endDate = new Date(
      Date.now() + subscription.plan.duration * 24 * 60 * 60 * 1000
    );

    await subscription.save();

    res.json({
      success: true,
      message: "Payment successful",
      subscription,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};