const Plan = require("../model/Plan");


exports.createPlan = async (req, res) => {
  try {
    // Payload destructure karna
    const { name, description, price, duration, isPublished } = req.body;

    // Basic validation
    if (!name || !description || !price || !duration) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, description, price, and duration",
      });
    }

    // Payload prepare karna (extra fields ignore)
    const payload = {
      name,
      description,
      price,
      duration,
      isPublished: isPublished || false, // default false
    };

    // Plan create karna
    const plan = await Plan.create(payload);

    // Response
    res.status(201).json({
      success: true,
      message: "Plan created successfully",
      data: plan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


exports.updatePlan = async (req, res) => {
  try {
    const { id } = req.params;

    //  Validate plan ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Plan ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Plan ID",
      });
    }

    // Prepare updated data from request body
    const { name, description, price, duration, isPublished } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = price;
    if (duration) updateData.duration = duration;
    if (typeof isPublished === "boolean") updateData.isPublished = isPublished;

    // 3 Update plan in DB
    const updatedPlan = await Plan.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedPlan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    //  Response
    res.status(200).json({
      success: true,
      message: "Plan updated successfully",
      data: updatedPlan,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.getPublishedPlans = async (req, res) => {
  const plans = await Plan.find({ isPublished: true });
  res.json(plans);
};


