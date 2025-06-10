import axios from "axios";
import { BASE_URL } from "./endpoint";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-Type": "application/json",
    Accept: "application/json",
  },
});

// Response interceptors

axiosClient.interceptors.response.use(
  (response) => {
    // Successful response
    return response.data;
  },
  (error) => {
    // handel errors
    if (error.response) {
      // Server response status(2xx)
      console.error("API Error", {
        status: error.response.status,
        data: error.response.data,
        header: error.response.headers,
      });
      return Promise.reject({
        message: getErrorMessage(error.response.status),
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      // Response sent but no response received
      console.log("Network Error: ", error.request);
      return Promise.reject({
        isNetWorkError: true,
        message: "Network error. Please check your internet connections",
        request: error.request,
      });
    } else {
      console.error("Request error", error.message);
      return Promise.reject({
        message: "Request error",
        details: error.message,
      });
    }
  }
);

// Error helper messages
function getErrorMessage(status) {
  switch (status) {
    case 400:
      return "Bad request. Please check your parameters.";
    case 401:
      return "Unauthorized. Please log in.";
    case 402:
      return "Payment required.";
    case 403:
      return "Forbidden. You don’t have permission.";
    case 404:
      return "Resource not found.";
    case 405:
      return "Method not allowed.";
    case 408:
      return "Request timeout.";
    case 422:
      return "Validation failed.";
    case 429:
      return "Too many requests. Please slow down.";
    case 500:
      return "Internal server error. Please try again later.";
    case 503:
      return "Service unavailable. Please try again later.";
    default:
      return `An error occurred (${status}).`;
  }
}

export default axiosClient;
