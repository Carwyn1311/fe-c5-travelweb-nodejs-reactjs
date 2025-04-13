import { axiosToken } from "../features/AxiosInterceptor/Content/axiosToken";

export interface ApiResponse {
  success: boolean;
  data: any;
}

const ProvinceService = {
  // Lấy danh sách tất cả các tỉnh
  getProvinces: async (): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get('/provinces');
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi lấy danh sách tỉnh:", error.response || error);
      throw error;
    }
  },
  
  // Lấy chi tiết một tỉnh theo id
  getProvinceById: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/provinces/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy thông tin tỉnh với id ${id}:`, error.response || error);
      throw error;
    }
  },
  
  // Tạo một tỉnh mới (mặc định country là 'Vietnam')
  createProvince: async (name: string, country: string = 'Vietnam'): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.post('/provinces', { name, country });
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi tạo tỉnh mới:", error.response || error);
      throw error;
    }
  },
  
  // Cập nhật thông tin tỉnh theo id
  updateProvince: async (id: string, provinceData: any): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.put(`/provinces/${id}`, provinceData);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi cập nhật tỉnh với id ${id}:`, error.response || error);
      throw error;
    }
  },
  
  // Xóa tỉnh theo id
  deleteProvince: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.delete(`/provinces/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi xóa tỉnh với id ${id}:`, error.response || error);
      throw error;
    }
  },
};

export default ProvinceService;
