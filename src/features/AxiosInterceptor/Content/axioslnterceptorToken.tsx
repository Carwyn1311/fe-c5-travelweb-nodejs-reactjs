import axios from 'axios';
import { User } from '../../../models/User';

const axiosInstanceToken = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

// Interceptor cho request
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

// Hàm xử lý khi token không hợp lệ (401)
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

    // Kiểm tra phản hồi 304: Tài nguyên không thay đổi
    if (response.status === 304) {
      console.log('Data not modified, using cached version.');
    }

    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // Xử lý lỗi 401 - Unauthorized (Token không hợp lệ hoặc hết hạn)
      if (status === 401) {
        handleUnauthorized();
      }

      // Xử lý lỗi 404 - Endpoint không tìm thấy
      if (status === 404) {
        console.error(`API endpoint not found: ${error.config.url}`);
        alert('API endpoint not found. Please check the URL.');
      }

      // Xử lý lỗi 304 - Tài nguyên không thay đổi
      if (status === 304) {
        console.log('Data not modified, using cached version.');
        alert('The data has not changed. Using cached version.');
      }

      // Xử lý các lỗi API khác
      console.error("API error:", status, error.response.data);
    } else {
      console.error("Network or other error", error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstanceToken;
