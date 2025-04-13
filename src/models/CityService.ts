import { axiosToken } from "../features/AxiosInterceptor/Content/axiosToken";

export interface ApiResponse {
  success: boolean;
  data: any;
}

const CityService = {
  // Lấy danh sách tất cả các thành phố
  getCities: async (): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get('/cities');
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi lấy danh sách thành phố:", error.response || error);
      throw error;
    }
  },

  // Lấy chi tiết một thành phố theo id
  getCityById: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/cities/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy thông tin thành phố với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Tạo thành phố mới với tham số: name, description và provinceId
  createCity: async (name: string, description: string, provinceId: string): Promise<ApiResponse> => {
    try {
      const payload = { name, description, province_id: provinceId };
      const response = await axiosToken.post('/cities', payload);
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi tạo thành phố mới:", error.response || error);
      throw error;
    }
  },

  // Cập nhật thông tin thành phố theo id
  updateCity: async (id: string, cityData: any): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.put(`/cities/${id}`, cityData);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi cập nhật thành phố với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Xóa thành phố theo id
  deleteCity: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.delete(`/cities/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi xóa thành phố với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Lấy danh sách các thành phố thuộc một tỉnh, dựa theo provinceId
  getCitiesByProvince: async (provinceId: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/cities/province/${provinceId}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy thành phố theo tỉnh với provinceId ${provinceId}:`, error.response || error);
      throw error;
    }
  },
};

export default CityService;
