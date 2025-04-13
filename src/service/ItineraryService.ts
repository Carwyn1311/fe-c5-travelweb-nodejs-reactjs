// src/services/ItineraryService.ts
import { axiosToken } from "../features/AxiosInterceptor/Content/axiosToken";

export interface ApiResponse {
  success: boolean;
  data: any;
}

const ItineraryService = {
  // Lấy tất cả các lịch trình
  getItineraries: async (): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get('/itineraries');
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi lấy danh sách lịch trình:", error.response || error);
      throw error;
    }
  },

  // Lấy chi tiết một lịch trình theo id
  getItineraryById: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/itineraries/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy thông tin lịch trình với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Tạo lịch trình mới
  createItinerary: async (itineraryData: any): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.post('/itineraries', itineraryData);
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi tạo lịch trình mới:", error.response || error);
      throw error;
    }
  },

  // Cập nhật lịch trình theo id
  updateItinerary: async (id: string, itineraryData: any): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.put(`/itineraries/${id}`, itineraryData);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi cập nhật lịch trình với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Xóa lịch trình theo id
  deleteItinerary: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.delete(`/itineraries/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi xóa lịch trình với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Lấy lịch trình theo destinationId
  getItinerariesByDestination: async (destinationId: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/itineraries/destination/${destinationId}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy lịch trình theo destination với destinationId ${destinationId}:`, error.response || error);
      throw error;
    }
  },
};

export default ItineraryService;
