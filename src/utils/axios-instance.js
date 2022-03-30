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
let axioxPrivate = axios.create(defaultConfig);
let axiosInstance = axios.create(defaultConfig);

// Set the AUTH token for all request
axioxPrivate.interceptors.request.use(function (config) {
  const token =
    localStorage.getItem("token") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDMyMDAwMmVkYjI0YTdjNmE3NGMyZCIsImlhdCI6MTY0ODYyMzkyNywiZXhwIjoxNjQ4ODgzMTI3fQ.G7M4hfa5ZS9bpKKs8mLWIiuEej5HiKSaETsfUytT5AQ";
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export { axioxPrivate, axiosInstance };
