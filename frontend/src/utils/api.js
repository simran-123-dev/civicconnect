const API_BASE = "http://localhost:5000/api";

export const setToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const clearToken = () => {
  localStorage.removeItem("authToken");
};

const getHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const apiCall = async (method, endpoint, body = null) => {
  const options = {
    method,
    headers: getHeaders(),
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, options);

  const text = await response.text();   // safer parsing
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(data.message || "API error");
  }

  return data;
};

export const register = async (name, email, password, role = "user", adminKey = "", town = "") => {
  return apiCall("POST", "/auth/register", {
    name,
    email,
    password,
    role,
    adminKey,
    town,
  });
};

export const login = async (email, password) => {
  return apiCall("POST", "/auth/login", { email, password });
};

export const getComplaints = async () => {
  return apiCall("GET", "/complaints");
};

export const getComplaint = async (id) => {
  return apiCall("GET", `/complaints/${id}`);
};

export const createComplaint = async (data) => {
  return apiCall("POST", "/complaints", data);
};

export const updateComplaint = async (id, data) => {
  return apiCall("PATCH", `/complaints/${id}`, data);
};
