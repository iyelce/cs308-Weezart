import axios from "axios";
import { getToken } from "../helpers/Utils";
import { authUtils } from "../";
// import { toast } from 'react-toastify';

export const baseURL = "http://localhost:8080";

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
    "Content-Type": "application/json",
    // Accept: '*/*',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    console.log(err);
    if (err.response.status === 401) {
      localStorage.removeItem("current_user");
      localStorage.removeItem("access-token");
      window.location.href = "/user/login";
    } else if (err.response.status === 422) {
      const errors = err.response.data.errors;
      for (const key in errors) {
        return new Promise(() => {});
      }
    }
  }
);

export default instance;
