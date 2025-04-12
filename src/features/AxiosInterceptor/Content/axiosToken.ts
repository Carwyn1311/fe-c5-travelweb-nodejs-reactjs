import axios from 'axios';
import { User } from '../../../models/User';

const axiosToken = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

// Interceptor cho request
axiosToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Hàm xử lý khi token không hợp lệ (401)
const handleUnauthorized = () => {
  console.error("Unauthorized, redirecting to login...");
  User.clearUserData();
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  window.location.href = '/login';
};

// Interceptor cho response
axiosToken.interceptors.response.use(
  (response) => {
    if (response.data === undefined) {
      console.error("Received undefined response from API");
      return Promise.reject(new Error("API returned undefined"));
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // Xử lý lỗi 404: Endpoint không tìm thấy
      if (status === 404) {
        console.error(`API endpoint not found: ${error.config.url}`);
        alert('API endpoint not found. Please check the URL.');
      }

      // Xử lý lỗi 304: Tài nguyên không thay đổi (Không có dữ liệu mới)
      if (status === 304) {
        console.log('Data not modified, using cached version.');
        alert('The data has not changed. Using cached version.');
      }

      // Xử lý lỗi 401: Unauthorized - Token hết hạn hoặc không hợp lệ
      if (status === 401) {
        handleUnauthorized();
      } else {
        console.error("API error:", status, error.response.data);
      }
    } else {
      console.error("Network or other error", error);
    }
    return Promise.reject(error);
  }
);

// POST request
const postRequest = async (linkUrl: string, data: any) => {
  try {
    const response = await axiosToken.post(linkUrl, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// GET request
const getRequest = async (linkUrl: string, params?: any) => {
  try {
    const response = await axiosToken.get(linkUrl, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// PUT request
const putRequest = async (linkUrl: string, data: any) => {
  try {
    const response = await axiosToken.put(linkUrl, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// DELETE request
const deleteRequest = async (linkUrl: string) => {
  try {
    const response = await axiosToken.delete(linkUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { axiosToken, postRequest, getRequest, putRequest, deleteRequest };
