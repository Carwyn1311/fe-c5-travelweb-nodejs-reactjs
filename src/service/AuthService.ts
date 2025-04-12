import { axiosToken } from "../features/AxiosInterceptor/Content/axiosToken";
import { User } from "../features/User/Content/User";

const AuthService = {
  login: async (username: string, password: string) => {
    try {
      const response = await axiosToken.post("/auth/login", { username, password });
      if (response.data) {
        const { token } = response.data;
        // Giải mã token hoặc lưu thông tin user (được thực hiện ở User.decodeAndStoreUserData nếu có)
        User.decodeAndStoreUserData(token);
        return response.data;
      }
      throw new Error("No data returned from API.");
    } catch (error) {
      throw error;
    }
  },

  // Đăng ký người dùng
  register: async (username: string, email: string, password: string, fullname: string, phone: string) => {
    try {
      const response = await axiosToken.post("/auth/signup", {
        username,
        email,
        password,
        fullname, // Sử dụng "fullname" (chữ n thường) như backend mong đợi
        phone,
      });
      
      // Chấp nhận cả status 200 và 201 (backend trả về 201 khi signup thành công)
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      throw new Error("Failed to create account.");
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    User.clearUserData();
    window.location.href = "/login";
  },
};

export default AuthService;
