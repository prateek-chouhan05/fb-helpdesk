// lib/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "/api/proxy",
  withCredentials: true,
});

// Register API
export const registerUser = async (body) => {
  const res = await API.post("/auth/register", body);

  return res.data;
};

// Login API
export const loginUser = async (body) => {
  const res = await API.post("/auth/login", body);

  return res.data;
};

// Get current logged-in user
export const getCurrentUser = async () => {
  const res = await API.get("/auth/me");

  return res.data;
};

export const checkConnection = async () => {
  const res = await API.get("/facebook/status");

  return res.data;
};

export const disconnectFacebookIntegration = async (body) => {
  const res = await API.delete("/facebook/disconnect", {
    data: body,
  });

  return res.data;
};
