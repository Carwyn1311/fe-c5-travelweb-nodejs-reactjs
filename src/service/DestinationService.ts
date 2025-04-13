// src/services/DestinationService.ts
import { axiosToken } from "../features/AxiosInterceptor/Content/axiosToken";

export interface ApiResponse {
  success: boolean;
  data: any;
}

const DestinationService = {
  // Lấy tất cả các điểm đến
  getDestinations: async (): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get('/destinations');
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi lấy danh sách điểm đến:", error.response || error);
      throw error;
    }
  },

  // Lấy chi tiết một điểm đến theo id
  getDestinationById: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/destinations/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy thông tin điểm đến với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Tạo điểm đến mới
  createDestination: async (destinationData: any): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.post('/destinations', destinationData);
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi tạo điểm đến mới:", error.response || error);
      throw error;
    }
  },

  // Cập nhật điểm đến theo id
  updateDestination: async (id: string, destinationData: any): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.put(`/destinations/${id}`, destinationData);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi cập nhật điểm đến với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Xóa điểm đến theo id
  deleteDestination: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.delete(`/destinations/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi xóa điểm đến với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Lấy điểm đến theo province
  getDestinationsByProvince: async (provinceId: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/destinations/province/${provinceId}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy điểm đến theo tỉnh với provinceId ${provinceId}:`, error.response || error);
      throw error;
    }
  },

  // Lấy điểm đến theo city
  getDestinationsByCity: async (cityId: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/destinations/city/${cityId}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy điểm đến theo thành phố với cityId ${cityId}:`, error.response || error);
      throw error;
    }
  },

  // Tìm kiếm điểm đến theo từ khóa
  searchDestinations: async (keyword: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/destinations/search/${keyword}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi tìm kiếm điểm đến với keyword ${keyword}:`, error.response || error);
      throw error;
    }
  },
};

export default DestinationService;
