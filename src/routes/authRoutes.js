const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getMe,
} = require("../controllers/authController");

const {
  protect,
} = require("../middlewares/authMiddleware");

// =====================================================
// AUTH ROUTES
// =====================================================

// Đăng ký
router.post("/register", register);

// Đăng nhập
router.post("/login", login);

// Lấy thông tin tài khoản hiện tại
router.get("/me", protect, getMe);

module.exports = router;