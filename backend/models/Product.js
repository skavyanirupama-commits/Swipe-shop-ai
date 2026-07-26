import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide product title"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Please provide product brand"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
    },
    category: {
      type: String,
      required: [true, "Please provide product category"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },
    discountPercentage: {
      type: Number,
      min: [0, "Discount percentage cannot be negative"],
      max: [100, "Discount percentage cannot exceed 100%"],
      default: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    thumbnail: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot exceed 5"],
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: [true, "Please provide product stock quantity"],
      min: [0, "Stock quantity cannot be negative"],
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    colors: {
      type: [String],
      default: [],
    },
    sizes: {
      type: [String],
      default: [],
    },
    gender: {
      type: String,
      enum: ["men", "women", "unisex", "kids"],
      default: "unisex",
    },
    affiliateLink: {
      type: String,
      trim: true,
      default: "",
    },
    sourceStore: {
      type: String,
      trim: true,
      default: "SwipeShop",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexing for search and AI recommendation query performance
productSchema.index({ title: "text", description: "text", tags: "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;
