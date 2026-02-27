const router = require("express").Router();
const { authMiddleware, adminMiddleware } = require("../middleware/jwt");
const { createPlan,updatePlan, getPublishedPlans } = require("../controllers/planController");

router.post("/", authMiddleware, adminMiddleware, createPlan);
router.patch("/:id/", authMiddleware, adminMiddleware, updatePlan);
router.get("/", getPublishedPlans);

module.exports = router;


// http://localhost:5000/api/plans
// http://localhost:5000/api/update/:id/

// {
//   "name": "Premium Plan Plus",
//   "description": "Access all premium features for 2 months.",
//   "price": 899,
//   "duration": 60,
//   "isPublished": true
// }

//  http://localhost:5000/api/plans   
