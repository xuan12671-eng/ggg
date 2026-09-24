const express = require('express');

const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const {
  protect,
  adminOnly,
} = require('../middlewares/authMiddleware');

// =====================================================
// ROUTES SẢN PHẨM
// =====================================================

// Công khai: Mọi người đều có thể xem sản phẩm
router.get('/', getProducts);
router.get('/:id', getProductById);

// =====================================================
// ADMIN ROUTES
// Bắt buộc đăng nhập và có quyền Admin
// =====================================================

// Thêm sản phẩm
router.post('/', protect, adminOnly, createProduct);

// Sửa sản phẩm
router.put('/:id', protect, adminOnly, updateProduct);

// Xóa sản phẩm
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;