// src/services/ReviewService.ts
import { axiosToken } from "../features/AxiosInterceptor/Content/axiosToken";

export interface ApiResponse {
  success: boolean;
  data: any;
}

const ReviewService = {
  // Lấy tất cả các đánh giá
  getReviews: async (): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get('/reviews');
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi lấy danh sách đánh giá:", error.response || error);
      throw error;
    }
  },

  // Lấy chi tiết một đánh giá theo id
  getReviewById: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/reviews/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy thông tin đánh giá với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Tạo đánh giá mới
  createReview: async (reviewData: any): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.post('/reviews', reviewData);
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi tạo đánh giá mới:", error.response || error);
      throw error;
    }
  },

  // Cập nhật đánh giá (chỉ người tạo đánh giá hoặc Admin)
  updateReview: async (id: string, reviewData: any): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.put(`/reviews/${id}`, reviewData);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi cập nhật đánh giá với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Xóa đánh giá (cần truyền thêm userId và isAdmin nếu cần trong backend)
  deleteReview: async (id: string, userId: string, isAdmin: boolean): Promise<ApiResponse> => {
    try {
      // Giả sử backend lấy tham số qua query để kiểm tra quyền
      const response = await axiosToken.delete(`/reviews/${id}`, { data: { userId, isAdmin } });
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi xóa đánh giá với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Lấy đánh giá theo người dùng
  getReviewsByUser: async (userId: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/reviews/user/${userId}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy đánh giá theo người dùng với userId ${userId}:`, error.response || error);
      throw error;
    }
  },

  // Lấy đánh giá theo điểm đến
  getReviewsByDestination: async (destinationId: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/reviews/destination/${destinationId}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy đánh giá theo điểm đến với destinationId ${destinationId}:`, error.response || error);
      throw error;
    }
  },
};

export default ReviewService;
