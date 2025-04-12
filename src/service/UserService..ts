import { axiosToken } from "../features/AxiosInterceptor/Content/axiosToken";

interface ApiResponse {
  success: boolean;
  data: any;
}

const UserService = {
  getUsers: async (): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get('/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getRoles: async (): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get('/roles');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getUserById: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (id: string, data: any): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.put(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateUserRole: async (id: string, roles: any[]): Promise<ApiResponse> => {
    try {
      // Nếu roles là mảng các đối tượng Role, chúng ta chuyển thành mảng các role id
      const roleIds = roles.map(role => typeof role === 'string' ? role : role.id);
      console.log(`API updateUserRole: userId=${id}, roles=${JSON.stringify(roleIds)}`);
      const response = await axiosToken.put(`/users/${id}/roles`, { roles: roleIds });
      console.log("API updateUserRole response:", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  deleteUser: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createUser: async (userData: any): Promise<ApiResponse> => {
    try {
      const response = await axiosToken.post('/users', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;
