// ManagerUser.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Spin, Select, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../css/ListMain.css';
import UserService from '../../../service/UserService.';
import { User as UserModel } from '../../../models/User';
import ListUser from './ListUser';
import ViewUser from './ViewUser';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';


export interface IUser {
  id: string;
  fullname: string | null;
  username: string;
  email: string;
  address: string | null;
  phone: string | null;
  roles: { id: string; name: string }[];
}

export interface IRole {
  id: string;
  name: string;
}

const ManagerUser: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<'id' | 'username' | 'fullname'>('username');
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const successMessageShownRef = useRef(false);

  // Lấy user hiện hành từ UserModel
  const currentUser = UserModel.getUserData();

  // Kiểm tra quyền truy cập: chỉ Admin và CSKH mới được vào trang
  useEffect(() => {
    if (!currentUser || (!currentUser.isAdmin() && !currentUser.isCSKH())) {
      message.error("Bạn không có quyền truy cập trang này!");
      navigate("/login");
      return;
    }
    fetchUsers();
    fetchRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // Load danh sách người dùng
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await UserService.getUsers();
      console.log("API getUsers response:", response);
      // Nếu backend trả về _id, chuyển map _id -> id
      const usersData = response.data.map((user: any) => ({
        ...user,
        id: user._id || user.id,
      }));
      setUsers(usersData);
      if (!successMessageShownRef.current) {
        message.success('Tải danh sách người dùng thành công');
        successMessageShownRef.current = true;
      }
    } catch (error) {
      console.error("Fetch users error:", error);
      message.error('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  // Load danh sách vai trò
  const fetchRoles = async () => {
    try {
      const response = await UserService.getRoles();
      console.log("API getRoles response:", response);
      setRoles(response.data);
    } catch (error) {
      console.error("Fetch roles error:", error);
      message.error('Không thể tải danh sách vai trò');
    }
  };

  // Xử lý tìm kiếm
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSearchCategoryChange = (value: 'id' | 'username' | 'fullname') => {
    setSearchCategory(value);
  };

  // Lọc danh sách dựa trên tiêu chí tìm kiếm
  const filteredUsers = users.filter(user => {
    const fieldValue = user[searchCategory] || "";
    return fieldValue.toLowerCase().includes(searchValue.toLowerCase());
  });

  // Callback để mở modal xem/sửa user
  const handleViewUser = async (user: IUser) => {
    try {
      console.log("API getUserById: id =", user.id);
      const response = await UserService.getUserById(user.id);
      console.log("API getUserById response:", response);
      if (response.success) {
        setSelectedUser(response.data);
        setIsViewModalOpen(true);
      } else {
        message.error('Không thể lấy thông tin người dùng');
      }
    } catch (error: any) {
      console.error("View user error:", error);
      message.error('Lỗi khi lấy thông tin người dùng: ' + (error as Error).message);
    }
  };

  // Callback để mở modal thêm user
  const handleOpenAddUser = () => {
    if (!currentUser || !currentUser.isAdmin()) {
      message.error('Bạn không có quyền thêm người dùng');
      return;
    }
    setIsAddModalOpen(true);
  };

  // Callback để mở modal xác nhận xóa user
  const handleOpenDeleteUser = (user: IUser) => {
    if (!currentUser || !currentUser.isAdmin()) {
      message.error('Bạn không có quyền xóa người dùng');
      return;
    }
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  // Callback để cập nhật user (chỉ Admin)
  const handleUpdateUser = async (values: any) => {
    if (!selectedUser) return;
    if (!currentUser || !currentUser.isAdmin()) {
      message.error('Bạn không có quyền cập nhật thông tin');
      return;
    }
    try {
      console.log("API updateUser: id =", selectedUser.id, "data =", values);
      const response = await UserService.updateUser(selectedUser.id, values);
      console.log("API updateUser response:", response);
      message.success('Cập nhật người dùng thành công');
      setUsers(users.map(user => user.id === selectedUser.id ? { ...selectedUser, ...values } : user));
      setIsViewModalOpen(false);
    } catch (error: any) {
      console.error("Update user error:", error);
      message.error('Lỗi khi cập nhật người dùng: ' + (error as Error).message);
    }
  };

  // Callback để thay đổi role của user
  const handleRoleChange = async (userId: string, roleId: string) => {
    if (!currentUser || !currentUser.isAdmin()) {
      message.error('Bạn không có quyền thay đổi vai trò người dùng');
      return;
    }
    try {
      const response = await UserService.updateUserRole(userId, [roleId]);
      if (response.success) {
        message.success('Cập nhật vai trò thành công');
        fetchUsers();
      }
    } catch (error: any) {
      console.error("Update role error:", error);
      message.error('Lỗi khi cập nhật vai trò: ' + error.message);
    }
  };

  // Callback để xóa user (chỉ Admin)
  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    if (!currentUser || !currentUser.isAdmin()) {
      message.error('Bạn không có quyền xóa người dùng');
      return;
    }
    try {
      console.log("API deleteUser: id =", selectedUser.id);
      const response = await UserService.deleteUser(selectedUser.id);
      console.log("API deleteUser response:", response);
      message.success('Xóa người dùng thành công');
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      console.error("Delete user error:", error);
      message.error('Lỗi khi xóa người dùng: ' + (error as Error).message);
    }
  };

  return (
    <div className="mainlist-container">
      {/* Header */}
      <div className="mainlist-header">
        <h2 className="mainlist-title">Quản Lý Người Dùng</h2>
        {currentUser && currentUser.isAdmin() && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenAddUser}
            className="mainlist-add-button"
          >
            Thêm Người Dùng
          </Button>
        )}
      </div>

      {/* Search Form */}
      <div className="mainlist-search-form" style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <Select
          defaultValue="username"
          style={{ width: 150 }}
          onChange={(value: 'id' | 'username' | 'fullname') => handleSearchCategoryChange(value)}
        >
          <Select.Option value="id">Tìm theo ID</Select.Option>
          <Select.Option value="username">Tìm theo tên đăng nhập</Select.Option>
          <Select.Option value="fullname">Tìm theo họ tên</Select.Option>
        </Select>
        <Input
          placeholder="Nhập từ khóa tìm kiếm"
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      {/* List User */}
      {loading ? (
        <div className="mainlist-spin-container">
          <Spin size="large" />
        </div>
      ) : (
        <ListUser 
          users={filteredUsers}
          onViewUser={handleViewUser}
          onDeleteUser={handleOpenDeleteUser}
          currentUser={currentUser}
        />
      )}

      {/* Modal View / Edit User */}
      {isViewModalOpen && selectedUser && (
        <ViewUser 
          visible={isViewModalOpen}
          user={selectedUser}
          onClose={() => setIsViewModalOpen(false)}
          onUpdateUser={handleUpdateUser}
          roles={roles}
          onRoleChange={(roleId: string) => {
            if (selectedUser) {
              // Có thể tích hợp chức năng chỉnh sửa role tại đây nếu cần, hoặc dùng riêng component EditUser
              // Trong ví dụ này, ta gọi trực tiếp hàm handleRoleChange
              handleRoleChange(selectedUser.id, roleId);
            }
          }}
          currentUser={currentUser}
        />
      )}

      {/* Modal Add User */}
      {isAddModalOpen && (
        <AddUser 
          visible={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onCreateUser={async (values: any) => {
            console.log("API createUser, values:", values);
            try {
              const response = await UserService.createUser(values);
              console.log("API createUser response:", response);
              message.success('Tạo người dùng thành công');
              setIsAddModalOpen(false);
              fetchUsers();
            } catch (error: any) {
              console.error("Create user error:", error);
              message.error('Lỗi khi tạo người dùng: ' + (error as Error).message);
            }
          }}
        />
      )}

      {/* Modal Delete User */}
      {isDeleteModalOpen && selectedUser && (
        <DeleteUser 
          visible={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDeleteUser}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default ManagerUser;
