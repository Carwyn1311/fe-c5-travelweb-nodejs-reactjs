// src/services/ImgService.ts
import { axiosToken } from "../features/AxiosInterceptor/Content/axiosToken";

export interface ApiResponse {
  success: boolean;
  data: any;
}

const ImgService = {
  /**
   * Upload 1 ảnh
   * Endpoint: POST /upload/image
   */
  uploadImage: async (file: File): Promise<ApiResponse> => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axiosToken.post('/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data; // Giả sử API trả về { success: true, data: { imageUrl: '...' } }
    } catch (error: any) {
      console.error("Lỗi khi tải lên ảnh:", error.response || error);
      throw error;
    }
  },

  /**
   * Upload nhiều ảnh
   * Endpoint: POST /upload/images
   */
  uploadImages: async (files: File[]): Promise<ApiResponse> => {
    try {
      const formData = new FormData();
      files.forEach(file => formData.append('images', file));

      const response = await axiosToken.post('/upload/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data; // Giả sử API trả về { success: true, data: { imageUrls: ['...', ...] } }
    } catch (error: any) {
      console.error("Lỗi khi tải lên danh sách ảnh:", error.response || error);
      throw error;
    }
  },
};

export default ImgService;
