import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4001", // change if hosted
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
