const router = require("express").Router();
const { authMiddleware, adminMiddleware } = require("../middleware/jwt");
const { createPlan, publishPlan, getPublishedPlans } = require("../controllers/planController");

router.post("/", authMiddleware, adminMiddleware, createPlan);
router.patch("/:id/", authMiddleware, adminMiddleware, publishPlan);
router.get("/", getPublishedPlans);

module.exports = router;


// http://localhost:5000/api/plans
// http://localhost:5000/api/plans/:id/
//  http://localhost:5000/api/plans   