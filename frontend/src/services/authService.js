import api from "./api.js";

// Register a new user
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  if (response.data && response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Login existing user
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  if (response.data && response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Get profile of authenticated user
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// Logout user and purge token from storage
export const logoutUser = () => {
  localStorage.removeItem("token");
};
