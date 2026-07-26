import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

// @route   GET /api/products
// @access  Public
router.get("/", getProducts);

// @route   GET /api/products/:id
// @access  Public
router.get("/:id", getProductById);

// @route   POST /api/products
// @access  Private (Protected by JWT)
router.post("/", protect, createProduct);

// @route   PUT /api/products/:id
// @access  Private (Protected by JWT)
router.put("/:id", protect, updateProduct);

// @route   DELETE /api/products/:id
// @access  Private (Protected by JWT)
router.delete("/:id", protect, deleteProduct);

export default router;
