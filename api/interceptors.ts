import axios, { type CreateAxiosDefaults } from "axios";

const options: CreateAxiosDefaults = {
  baseURL: "http://192.168.124.140:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const axiosClassic = axios.create(options);
export default axiosClassic;
