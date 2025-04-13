// src/services/BookingService.ts
import { axiosToken } from "../features/AxiosInterceptor/Content/axiosToken";

export interface ApiResponse {
  success: boolean;
  data: any;
}

const BookingService = {
  // Lấy tất cả các đơn đặt vé
  getBookings: async (): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get('/bookings');
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi lấy danh sách đơn đặt vé:", error.response || error);
      throw error;
    }
  },

  // Lấy chi tiết một đơn đặt vé theo id
  getBookingById: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/bookings/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy thông tin đơn đặt vé với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Tạo mới đơn đặt vé
  createBooking: async (bookingData: any): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.post('/bookings', bookingData);
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi tạo đơn đặt vé mới:", error.response || error);
      throw error;
    }
  },

  // Cập nhật đơn đặt vé theo id
  updateBooking: async (id: string, bookingData: any): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.put(`/bookings/${id}`, bookingData);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi cập nhật đơn đặt vé với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Xóa đơn đặt vé theo id
  deleteBooking: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.delete(`/bookings/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi xóa đơn đặt vé với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Lấy đơn đặt vé theo người dùng
  getBookingsByUser: async (userId: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/bookings/user/${userId}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy đơn đặt vé theo người dùng với userId ${userId}:`, error.response || error);
      throw error;
    }
  },

  // Lấy đơn đặt vé theo trạng thái
  getBookingsByStatus: async (status: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/bookings/status/${status}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy đơn đặt vé theo trạng thái ${status}:`, error.response || error);
      throw error;
    }
  },

  // Cập nhật trạng thái đơn đặt vé
  updateBookingStatus: async (id: string, status: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.put(`/bookings/${id}/status`, { status });
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi cập nhật trạng thái đơn đặt vé với id ${id}:`, error.response || error);
      throw error;
    }
  },
};

export default BookingService;
