import axios, { type AxiosInstance } from "axios";
export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:1488/",
  withCredentials: true,
});
