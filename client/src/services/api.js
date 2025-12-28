import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Services API
export const servicesAPI = {
  getAll: () => api.get("/services"),
  getBySlug: (slug) => api.get(`/services/${slug}`),
  create: (data) => api.post("/services", data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
};

// Media API
export const mediaAPI = {
  getAll: (params) => api.get("/media", { params }),
  getBySlug: (slug) => api.get(`/media/${slug}`),
  getCategories: () => api.get("/media/categories/list"),
  create: (data) => api.post("/media", data),
  update: (id, data) => api.put(`/media/${id}`, data),
  delete: (id) => api.delete(`/media/${id}`),
};

// Blog API
export const blogAPI = {
  getAll: (params) => api.get("/blogs", { params }),
  getBySlug: (slug) => api.get(`/blogs/${slug}`),
  getCategories: () => api.get("/blogs/categories/list"),
  getTags: () => api.get("/blogs/tags/list"),
  getByService: (serviceSlug, params) =>
    api.get(`/blogs/service/${serviceSlug}`, { params }),
  create: (data) => api.post("/blogs", data),
  update: (id, data) => api.put(`/blogs/${id}`, data),
  delete: (id) => api.delete(`/blogs/${id}`),
};

// Test function to debug
export const testAPI = {
  getBlogsByService: (serviceSlug) => {
    console.log("Making API call to:", `/api/blogs/service/${serviceSlug}`);
    return api.get(`/blogs/service/${serviceSlug}`);
  },
};

// Contact API
export const contactAPI = {
  submit: (data) => api.post("/contact", data),
  getAll: () => api.get("/contact"),
};

export default api;
