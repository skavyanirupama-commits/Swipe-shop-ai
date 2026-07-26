import Product from "../models/Product.js";

// @desc    Get all products with filtering, searching, sorting, and pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const {
      keyword,
      category,
      brand,
      minPrice,
      maxPrice,
      isFeatured,
      isTrending,
      gender,
      sortBy,
      page = 1,
      limit = 10,
    } = req.query;

    // 1. Build dynamic MongoDB query object
    const query = {};

    // Search by keyword (title, brand, category, or tags regex)
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { brand: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
        { tags: { $regex: keyword, $options: "i" } },
      ];
    }

    // Filter by category
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    // Filter by brand
    if (brand) {
      query.brand = { $regex: brand, $options: "i" };
    }

    // Filter by gender
    if (gender) {
      query.gender = gender.toLowerCase();
    }

    // Filter by price range
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined && minPrice !== "") {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice !== undefined && maxPrice !== "") {
        query.price.$lte = Number(maxPrice);
      }
    }

    // Filter by boolean flags (Featured / Trending)
    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === "true";
    }

    if (isTrending !== undefined) {
      query.isTrending = isTrending === "true";
    }

    // 2. Dynamic sorting configuration
    let sortOptions = { createdAt: -1 }; // Default: Latest products

    if (sortBy === "price-asc") {
      sortOptions = { price: 1 };
    } else if (sortBy === "price-desc") {
      sortOptions = { price: -1 };
    } else if (sortBy === "rating") {
      sortOptions = { rating: -1, numReviews: -1 }; // Best rated
    } else if (sortBy === "popular") {
      sortOptions = { numReviews: -1, rating: -1 };
    } else if (sortBy === "oldest") {
      sortOptions = { createdAt: 1 };
    }

    // 3. Pagination math
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * limitNum;

    // Parallel execution of total count & paginated documents
    const [totalProducts, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .populate("createdBy", "name email role")
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum),
    ]);

    const totalPages = Math.ceil(totalProducts / limitNum);

    return res.status(200).json({
      success: true,
      count: products.length,
      totalProducts,
      totalPages,
      currentPage: pageNum,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error fetching products",
      error: error.message,
    });
  }
};


// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "createdBy",
      "name email role"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error fetching product",
      error: error.message,
    });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      brand,
      description,
      category,
      price,
      originalPrice,
      discountPercentage,
      images,
      thumbnail,
      stock,
      tags,
      colors,
      sizes,
      gender,
      affiliateLink,
      sourceStore,
      isFeatured,
      isTrending,
    } = req.body;

    // 1. Validate required fields
    if (!title || !brand || !description || !category || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, brand, description, category, and price",
      });
    }

    // 2. Create product in database
    const product = await Product.create({
      title,
      brand,
      description,
      category,
      price,
      originalPrice,
      discountPercentage,
      images,
      thumbnail,
      stock,
      tags,
      colors,
      sizes,
      gender,
      affiliateLink,
      sourceStore,
      isFeatured,
      isTrending,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error creating product",
      error: error.message,
    });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Authorization check: Only product creator or admin can update
    if (
      product.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this product",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error updating product",
      error: error.message,
    });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Authorization check: Only product creator or admin can delete
    if (
      product.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this product",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error deleting product",
      error: error.message,
    });
  }
};
