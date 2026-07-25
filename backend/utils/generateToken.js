import jwt from "jsonwebtoken";

/**
 * Generate a JSON Web Token for user authentication
 * @param {string} userId - The MongoDB User ID
 * @returns {string} Signed JWT token
 */
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
