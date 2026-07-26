import api from "./api";

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Register a new user
export const registerUser = async (userData: RegisterUserData) => {
  const response = await api.post("/auth/register", userData);
  if (response.data && response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Login existing user
export const loginUser = async (credentials: LoginCredentials) => {
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
