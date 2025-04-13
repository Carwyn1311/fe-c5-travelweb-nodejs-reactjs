// src/services/ActivityService.ts
import { axiosToken } from "../features/AxiosInterceptor/Content/axiosToken";

export interface ApiResponse {
  success: boolean;
  data: any;
}

const ActivityService = {
  // Lấy tất cả các hoạt động
  getActivities: async (): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get('/activities');
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi lấy danh sách hoạt động:", error.response || error);
      throw error;
    }
  },

  // Lấy chi tiết một hoạt động theo id
  getActivityById: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/activities/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy thông tin hoạt động với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Tạo hoạt động mới
  createActivity: async (activityData: any): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.post('/activities', activityData);
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi tạo hoạt động mới:", error.response || error);
      throw error;
    }
  },

  // Cập nhật hoạt động theo id
  updateActivity: async (id: string, activityData: any): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.put(`/activities/${id}`, activityData);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi cập nhật hoạt động với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Xóa hoạt động theo id
  deleteActivity: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.delete(`/activities/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi xóa hoạt động với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Lấy hoạt động theo lịch trình (itinerary)
  getActivitiesByItinerary: async (itineraryId: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/activities/itinerary/${itineraryId}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy hoạt động theo lịch trình với itineraryId ${itineraryId}:`, error.response || error);
      throw error;
    }
  },
};

export default ActivityService;
