// src/services/http-common.js
import axios from "axios";

const http = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createConfig = ({
  method = "get",
  url,
  headers = {},
  params = {},
  data = {},
}) => {
  return {
    method,
    url,
    headers: {
      ...http.defaults.headers,
      ...headers,
    },
    params,
    data,
  };
};

export default http;
