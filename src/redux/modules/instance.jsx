
import axios from "axios";

export const instance = axios.create({
  baseURL: "http://13.209.26.228:8080/",
  withCredentials: true
});

instance.interceptors.request.use((config) => {
  const Authorization  = localStorage.getItem("Authorization");
  const refreshtoken = localStorage.getItem("refreshtoken");
  config.headers.Authorization = Authorization ;
  config.headers.refreshtoken = refreshtoken;
  return config;
});