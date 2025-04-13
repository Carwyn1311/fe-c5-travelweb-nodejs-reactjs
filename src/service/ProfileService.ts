// ProfileService.ts
import { axiosToken } from "../features/AxiosInterceptor/Content/axiosToken";

export interface ApiResponse {
  success: boolean;
  data: any;
}

const ProfileService = {
  // Lấy thông tin hồ sơ người dùng theo ID
  getProfileById: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi lấy thông tin hồ sơ:", error.response || error);
      throw error;
    }
  },

  // Cập nhật thông tin hồ sơ người dùng
  updateProfile: async (id: string, profileData: any): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.put(`/users/${id}`, profileData);
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi cập nhật hồ sơ:", error.response || error);
      throw error;
    }
  }
};

export default ProfileService;
