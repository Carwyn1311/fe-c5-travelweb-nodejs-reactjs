import axios from 'axios';

const axiosNoToken = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosNoToken.interceptors.response.use(
  (response) => {
    if (!response?.data) {
      console.error("Received empty response from API");
      return Promise.reject(new Error("API returned empty response"));
    }
    return response;
  },
  (error: any) => {
    // Lấy response từ error nếu có
    const { response } = error || {};
    if (response) {
      console.error("API error:", response.status, response.data);
    } else {
      console.error("Network or other error", error);
    }
    return Promise.reject(error);
  }
);

// Hàm GET
const getRequest = async (url: string, params?: any) => {
  try {
    const response = await axiosNoToken.get(url, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Hàm POST
const postRequest = async (url: string, data: any) => {
  try {
    const response = await axiosNoToken.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Hàm PUT
const putRequest = async (url: string, data: any) => {
  try {
    const response = await axiosNoToken.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Hàm DELETE
const deleteRequest = async (url: string) => {
  try {
    const response = await axiosNoToken.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { axiosNoToken, getRequest, postRequest, putRequest, deleteRequest };
