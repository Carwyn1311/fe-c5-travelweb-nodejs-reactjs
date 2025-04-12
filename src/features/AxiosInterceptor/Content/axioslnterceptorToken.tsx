import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User } from '../../User/Content/User';

const axiosInstanceToken = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

axiosInstanceToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Lấy JWT từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleUnauthorized = () => {
  console.error("Unauthorized, redirecting to login...");

  // Xóa token và chuyển hướng đến trang đăng nhập
  User.clearUserData();
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');

  // Sử dụng window.location.href để chuyển hướng
  window.location.href = '/login';
};

axiosInstanceToken.interceptors.response.use(
  (response) => {
    // Kiểm tra dữ liệu trả về có phải là undefined không
    if (response.data === undefined) {
      console.error("Received undefined response from API");
      return Promise.reject(new Error("API returned undefined"));
    }

    return response;
  },
  (error) => {
    if (error.response) {
      // Kiểm tra mã lỗi HTTP, ví dụ: 401 Unauthorized
      if (error.response.status === 401) {
        handleUnauthorized();
      } else {
        console.error("API error:", error.response.status, error.response.data);
      }
    } else {
      console.error("Network or other error", error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstanceToken;
