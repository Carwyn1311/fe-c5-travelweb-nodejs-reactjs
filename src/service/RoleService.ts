import { axiosToken, postRequest, getRequest, putRequest, deleteRequest } from "../features/AxiosInterceptor/Content/axiosToken";

interface ApiResponse {
  success: boolean;
  data: any;
}

const RoleService = {
  // Lấy danh sách tất cả role
  getRoles: async (): Promise<ApiResponse> => {
    try {
      const response = await getRequest('/roles');
      console.log("API getRoles response:", response);
      return response;
    } catch (error) {
      console.error("Error in getRoles:", error);
      throw error;
    }
  },

  // Tạo role mới (yêu cầu truyền vào tên role)
  createRole: async (name: string): Promise<ApiResponse> => {
    try {
      console.log("API createRole, name:", name);
      const response = await postRequest('/roles', { name });
      console.log("API createRole response:", response);
      return response;
    } catch (error) {
      console.error("Error in createRole:", error);
      throw error;
    }
  },

  // Cập nhật role (truyền id role và tên role mới)
  updateRole: async (id: string, name: string): Promise<ApiResponse> => {
    try {
      console.log("API updateRole, id:", id, "name:", name);
      const response = await putRequest(`/roles/${id}`, { name });
      console.log("API updateRole response:", response);
      return response;
    } catch (error) {
      console.error("Error in updateRole:", error);
      throw error;
    }
  },

  // Xóa role theo id
  deleteRole: async (id: string): Promise<ApiResponse> => {
    try {
      console.log("API deleteRole, id:", id);
      const response = await deleteRequest(`/roles/${id}`);
      console.log("API deleteRole response:", response);
      return response;
    } catch (error) {
      console.error("Error in deleteRole:", error);
      throw error;
    }
  },

  // Seed role (ví dụ: tạo role CSKH)
  seedRole: async (): Promise<ApiResponse> => {
    try {
      console.log("API seedRole call");
      const response = await postRequest('/roles/seed-role', {});
      console.log("API seedRole response:", response);
      return response;
    } catch (error) {
      console.error("Error in seedRole:", error);
      throw error;
    }
  }
};

export default RoleService;
