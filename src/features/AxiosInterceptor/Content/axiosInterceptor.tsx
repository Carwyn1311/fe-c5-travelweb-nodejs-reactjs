import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (!response.data) {
      console.error("Received empty response from API");
      return Promise.reject(new Error("API returned empty response"));
    }

    return response;
  },
  (error) => {
    if (error.response) {
      console.error("API error:", error.response.status, error.response.data);
    } else {
      console.error("Network or other error", error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
