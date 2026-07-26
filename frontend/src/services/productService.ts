import api from "./api";

// Fetch all products with optional filters, search, sorting, and pagination parameters
export const getProducts = async (params: Record<string, any> = {}) => {
  const response = await api.get("/products", { params });
  return response.data;
};

// Fetch single product by ID
export const getProductById = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Create a new product (Protected)
export const createProduct = async (productData: Record<string, any>) => {
  const response = await api.post("/products", productData);
  return response.data;
};

// Update an existing product (Protected)
export const updateProduct = async (id: string, productData: Record<string, any>) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

// Delete a product (Protected)
export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
