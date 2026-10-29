const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
} = require("../controllers/orderController");

const { protect, adminOnly } = require("../middlewares/authMiddleware");

// Khach co the dat hang
router.post("/", createOrder);

// Chi admin duoc xem tat ca don hang
router.get("/", protect, adminOnly, getOrders);

// Nguoi dung dang nhap; controller can kiem tra quyen xem don
router.get("/:id", protect, getOrderById);

// Chi admin duoc cap nhat trang thai don
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;
