import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to protect routes requiring authentication
export const protect = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  // 1. Read Authorization header and check for Bearer format (case-insensitive)
  if (authHeader && authHeader.toLowerCase().startsWith("bearer")) {
    try {
      // 2. Extract token cleanly handling single or multiple spaces (e.g. "Bearer   <token>")
      token = authHeader.split(/\s+/)[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Not authorized, token missing",
        });
      }

      // 3. Verify token with secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Fetch user from MongoDB using token payload ID (excluding password)
      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Not authorized, user not found",
        });
      }

      // 5. Call next() to pass control to next handler
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token invalid or expired",
      });
    }
  }

  // 6. Return 401 if no valid Authorization header was found
  return res.status(401).json({
    success: false,
    message: "Not authorized, no token provided",
  });
};





