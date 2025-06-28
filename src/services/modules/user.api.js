import axiosInstance from "../axiosInstance";

// POST user data
export const createUser = (data) => {
  return axiosInstance.post("/users", data);
};

// GET all users
export const getAllUsers = () => {
  return axiosInstance.get("/users");
};
