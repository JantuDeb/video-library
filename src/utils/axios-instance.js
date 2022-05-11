import axios from "axios";

const defaultConfig = {
  baseURL:
    // eslint-disable-next-line no-undef
    window.location.protocol === "http:"
      ? "http://localhost:4000/api/v1/"
      : "https://ionvu-live.herokuapp.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

// Create instance
let axiosInstance = axios.create(defaultConfig);

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
export { axiosInstance };
