import { axiosToken } from "../features/AxiosInterceptor/Content/axiosToken";

interface ApiResponse {
  success: boolean;
  data: any;
}

const UserService = {
  getUsers: async (): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get('/api/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getRoles: async (): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get('/api/roles');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getUserById: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/api/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (id: string, data: any): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.put(`/api/users/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateUserRole: async (id: string, roles: any[]): Promise<ApiResponse> => {
    try {
      // Giả sử backend nhận roles dưới dạng đối tượng (hoặc mảng các id)
      const response = await axiosToken.put(`/api/users/${id}/roles`, { roles });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteUser: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.delete(`/api/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createUser: async (userData: any): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.post('/api/users', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;
