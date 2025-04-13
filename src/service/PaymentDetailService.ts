// src/services/PaymentDetailService.ts
import { axiosToken } from "../features/AxiosInterceptor/Content/axiosToken";

export interface ApiResponse {
  success: boolean;
  data: any;
}

const PaymentDetailService = {
  // Lấy tất cả các chi tiết thanh toán
  getPaymentDetails: async (): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get('/payment-details');
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi lấy danh sách chi tiết thanh toán:", error.response || error);
      throw error;
    }
  },

  // Lấy chi tiết một thanh toán theo id
  getPaymentDetailById: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/payment-details/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy thông tin chi tiết thanh toán với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Tạo mới chi tiết thanh toán
  createPaymentDetail: async (paymentData: any): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.post('/payment-details', paymentData);
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi tạo chi tiết thanh toán mới:", error.response || error);
      throw error;
    }
  },

  // Cập nhật chi tiết thanh toán theo id
  updatePaymentDetail: async (id: string, paymentData: any): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.put(`/payment-details/${id}`, paymentData);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi cập nhật chi tiết thanh toán với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Xóa chi tiết thanh toán theo id
  deletePaymentDetail: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.delete(`/payment-details/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi xóa chi tiết thanh toán với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Lấy chi tiết thanh toán theo người dùng
  getPaymentDetailsByUser: async (userId: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/payment-details/user/${userId}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy chi tiết thanh toán theo người dùng với userId ${userId}:`, error.response || error);
      throw error;
    }
  },

  // Lấy chi tiết thanh toán theo trạng thái
  getPaymentDetailsByStatus: async (status: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/payment-details/status/${status}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy chi tiết thanh toán theo trạng thái ${status}:`, error.response || error);
      throw error;
    }
  },
};

export default PaymentDetailService;
