import axios from "axios";

const defaultConfig = {
  
  baseURL: "http://localhost:4000/",
    // window.location.protocol === "http:"
    // // eslint-disable-next-line no-undef
    //   ?
    //   : "https://ionvu-api.herokuapp.com/api/v1/",
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
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export  {axioxPrivate, axiosInstance};
