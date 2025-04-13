import { axiosNoToken } from "../features/AxiosInterceptor/Content/axiosNotoken";


export interface ApiResponse {
  success: boolean;
  data: any;
}

const DestinationImgService = {
  // Lấy tất cả hình ảnh điểm đến
  getAllDestinationImages: async (): Promise<ApiResponse> => {
    try {
      const response = await axiosNoToken.get('/destinationImages');
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi lấy danh sách hình ảnh điểm đến:", error.response || error);
      throw error;
    }
  },

  // Lấy chi tiết hình ảnh theo id
  getDestinationImageById: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosNoToken.get(`/destinationImages/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy thông tin hình ảnh với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Tạo hình ảnh từ URL (endpoint: POST /destinationImages/url/:destinationId)
  createDestinationImageFromUrl: async (
    destinationId: string,
    imageUrl: string
  ): Promise<ApiResponse> => {
    try {
      const payload = { image_url: imageUrl };
      const response = await axiosNoToken.post(`/destinationImages/url/${destinationId}`, payload);
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi tạo hình ảnh từ URL:", error.response || error);
      throw error;
    }
  },

  // Cập nhật hình ảnh theo id
  updateDestinationImage: async (id: string, imageUrl: string): Promise<ApiResponse> => {
    try {
      const payload = { image_url: imageUrl };
      const response = await axiosNoToken.put(`/destinationImages/${id}`, payload);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi cập nhật hình ảnh với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Xóa hình ảnh theo id
  deleteDestinationImage: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosNoToken.delete(`/destinationImages/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi xóa hình ảnh với id ${id}:`, error.response || error);
      throw error;
    }
  },

  // Lấy danh sách hình ảnh theo điểm đến
  getImagesByDestination: async (destinationId: string): Promise<ApiResponse> => {
    try {
      const response = await axiosNoToken.get(`/destinationImages/destination/${destinationId}`);
      return response.data;
    } catch (error: any) {
      console.error(`Lỗi khi lấy hình ảnh theo điểm đến với destinationId ${destinationId}:`, error.response || error);
      throw error;
    }
  },
};

export default DestinationImgService;
