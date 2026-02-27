const router = require("express").Router();
const { signup, login } = require("../controllers/userController");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;

// http://localhost:5000/api/auth/signup
// http://localhost:5000/api/auth/login