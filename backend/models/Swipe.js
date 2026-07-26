import mongoose from "mongoose";

const swipeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
    },
    direction: {
      type: String,
      enum: {
        values: ["left", "right", "up"],
        message: "Direction must be either left, right, or up",
      },
      required: [true, "Swipe direction is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Compound Unique Index: Prevents duplicate swipes for the same product by the same user
swipeSchema.index({ user: 1, product: 1 }, { unique: true });

const Swipe = mongoose.model("Swipe", swipeSchema);

export default Swipe;
