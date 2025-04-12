import { axiosToken } from "../features/AxiosInterceptor/Content/axiosToken";
import { User } from "../features/User/Content/User";

const AuthService = {
  login: async (username: string, password: string) => {
    try {
      const response = await axiosToken.post("/auth/login", { username, password });
      if (response.data) {
        const { token } = response.data;
        User.decodeAndStoreUserData(token);
        return response.data;
      }
      throw new Error("No data returned from API.");
    } catch (error) {
      throw error;
    }
  },

  // Đăng ký: gửi username, email, password, fullname, phone
  register: async (username: string, email: string, password: string, fullname: string, phone: string) => {
    try {
      const response = await axiosToken.post("/auth/signup", {
        username,
        email,
        password,
        fullname,
        phone,
      });
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      throw new Error("Failed to create account.");
    } catch (error) {
      throw error;
    }
  },

  // Gửi mã xác minh quên mật khẩu
  forgotPassword: async (email: string) => {
    try {
      const response = await axiosToken.post("/auth/forgotpassword", { email: email.trim() });
      if (response.status === 200) {
        return response.data;
      }
      throw new Error("Failed to send verification code.");
    } catch (error) {
      throw error;
    }
  },

  // Xác minh mã: gửi email và code
  verifyCode: async (email: string, code: string) => {
    try {
      const response = await axiosToken.post("/auth/verify-code", {
        email: email.trim(),
        code: code.trim()
      });
      if (response.status === 200) {
        return response.data;
      }
      throw new Error("Verification failed.");
    } catch (error) {
      throw error;
    }
  },

  // Đặt lại mật khẩu: gửi newPassword đến endpoint /auth/resetpassword/:token
  resetPassword: async (resetToken: string, email: string, newPassword: string) => {
    try {
      // Lưu ý: resetToken được truyền qua URL (params)
      const response = await axiosToken.post(`/auth/resetpassword/${resetToken}`, {
        email: email.trim(),
        newPassword: newPassword.trim()
      });
      if (response.status === 200) {
        return response.data;
      }
      throw new Error("Failed to reset password.");
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
