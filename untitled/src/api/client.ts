import axios from "axios";

const USERS_SERVICE_URL = import.meta.env.VITE_USERS_SERVICE_URL as string;

export const usersApi = axios.create({
  baseURL: USERS_SERVICE_URL,
});

usersApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
