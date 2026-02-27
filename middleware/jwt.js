// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// /* ===============================
//    ACCESS TOKEN
// ================================ */
// const generateAccessToken = (payload) => {
//   return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
//     expiresIn: "15m", // short life
//   });
// };

// /* ===============================
//    REFRESH TOKEN
// ================================ */
// const generateRefreshToken = (payload) => {
//   return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
//     expiresIn: "7d", // long life
//   });
// };

// /* ===============================
//    AUTH MIDDLEWARE
// ================================ */


// const Jwtauthenticate = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     console.log("AuthHeader:", authHeader);

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Unauthorized - Token missing" });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
//     console.log("Decoded JWT:", decoded);

//     req.user = {
//       id: decoded.id,
//       role: decoded.role,
//       email: decoded.email,
//       permissions: decoded.permissions,
//     };

//     next();
//   } catch (err) {
//     return res.status(403).json({
//       message: "Invalid or expired token",
//       error: err.message,
//     });
//   }
// };

// module.exports = {
//   generateAccessToken,
//   generateRefreshToken,
//   Jwtauthenticate,
// };



const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};