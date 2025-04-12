import { axiosToken } from "../features/AxiosInterceptor/Content/axiosToken";
import { User } from "../models/User";
import { Role } from "../models/Role"; // đảm bảo bạn có file Role.ts định nghĩa lớp Role

const AuthService = {
  login: async (username: string, password: string) => {
    try {
      const response = await axiosToken.post("/auth/login", { username, password });
      // Kiểm tra cấu trúc trả về của API theo định dạng mới
      if (response.data && response.data.success && response.data.data) {
        const { token: apiToken, user: apiUser } = response.data.data;
        let token = apiToken;
        if (token && token !== "") {
          console.log("Token from API:", token);
          // Nếu token hợp lệ, giải mã và lưu thông tin người dùng
          User.decodeAndStoreUserData(token);
        } else {
          console.warn("No token returned from API. Using fallback token (user ID).");
          // Nếu không có token, lấy dữ liệu fallback từ apiUser hoặc response.data.data
          const userData = apiUser ? apiUser : response.data.data;
          token = userData._id || userData.id || "fallback-token";
          console.log("Fallback token (user ID):", token);
  
          // Xử lý trường roles: nếu có mảng roles (dạng chuỗi) thì chuyển thành mảng đối tượng Role,
          // nếu không có thì mặc định là một mảng chứa Role "User"
          const fallbackRoles =
            userData.roles && Array.isArray(userData.roles) && userData.roles.length > 0
              ? userData.roles.map((roleStr: string) => new Role({ name: roleStr }))
              : [new Role({ name: "User" })];
  
          User.storeUserData(
            new User({
              id: userData._id || userData.id || "",
              username: userData.username,
              email: userData.email,
              roles: fallbackRoles,
              fullname: userData.fullname,
              token: token,
            }),
            token,
            true
          );
        }
        return response.data;
      }
      throw new Error("No data returned from API.");
    } catch (error) {
      throw error;
    }
  },

  register: async (
    username: string,
    email: string,
    password: string,
    fullname: string,
    phone: string
  ) => {
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

  verifyCode: async (email: string, code: string) => {
    try {
      const response = await axiosToken.post("/auth/verify-code", {
        email: email.trim(),
        code: code.trim(),
      });
      if (response.status === 200) {
        return response.data;
      }
      throw new Error("Verification failed.");
    } catch (error) {
      throw error;
    }
  },

  resetPassword: async (resetToken: string, email: string, newPassword: string) => {
    try {
      const response = await axiosToken.post(`/auth/resetpassword/${resetToken}`, {
        email: email.trim(),
        newPassword: newPassword.trim(),
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
