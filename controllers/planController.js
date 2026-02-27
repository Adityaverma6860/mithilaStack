const Plan = require("../model/Plan");

exports.createPlan = async (req, res) => {
  const plan = await Plan.create(req.body);
  res.json(plan);
};

exports.publishPlan = async (req, res) => {
  const plan = await Plan.findByIdAndUpdate(
    req.params.id,
    { isPublished: true },
    { new: true }
  );
  res.json(plan);
};

exports.getPublishedPlans = async (req, res) => {
  const plans = await Plan.find({ isPublished: true });
  res.json(plans);
};


// Api End Poitn 

// POST   /api/auth/signup
// POST   /api/auth/login
// POST   /api/plans
// PATCH  /api/plans/:id/publish