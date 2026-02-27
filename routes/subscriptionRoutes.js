const router = require("express").Router();
const { authMiddleware } = require("../middleware/jwt");
const { subscribePlan, mockPayment } = require("../controllers/subscriptionController");

router.post("/:planId", authMiddleware, subscribePlan);
router.post("/payment/:subId", authMiddleware, mockPayment);

module.exports = router;


// http://localhost:5000/api/subscription/:planId
// 69a14cfd0305c165c8afaba4
// http://localhost:5000/api/subscription/payment/:subId

// 69a152d344a9c013286d5d2f
