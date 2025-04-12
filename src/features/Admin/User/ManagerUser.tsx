import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Modal, message, Button, Input, Form, Select, Spin } from 'antd';
import { PlusOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import '../css/ListMain.css';
import UserService from '../../../service/UserService.';
import { User as UserModel } from '../../../models/User';

const { Option } = Select;

interface User {
  id: string;
  fullname: string | null;
  username: string;
  email: string;
  address: string | null;
  phone: string | null;
  roles: { id: string; name: string }[];
}

interface Role {
  id: string;
  name: string;
}

const ManagerUser: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<'id' | 'username' | 'fullname'>('username');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewUserModalOpen, setIsViewUserModalOpen] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [form] = Form.useForm();
  const successMessageShownRef = useRef(false);

  // Lấy đối tượng user hiện hành từ UserModel
  const currentUser = UserModel.getUserData();

  // Kiểm tra quyền truy cập
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

  // Fetch users, map _id -> id nếu cần và log ra console
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await UserService.getUsers();
      console.log("API getUsers response:", response);
      // Nếu backend trả về _id thì map sang id
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

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSearchCategoryChange = (value: 'id' | 'username' | 'fullname') => {
    setSearchCategory(value);
  };

  // Lọc users theo searchCategory và searchValue
  const filteredUsers = users.filter(user => {
    const fieldValue = user[searchCategory] || "";
    return fieldValue.toLowerCase().includes(searchValue.toLowerCase());
  });

  // Xử lý thay đổi vai trò cho người dùng
  const handleRoleChange = async (userId: string, roleId: string) => {
    if (!currentUser || !currentUser.isAdmin()) return; // CSKH không được thay đổi vai trò
    try {
      const roleToUpdate = roles.find(role => role.id === roleId);
      if (!roleToUpdate) return;
      const rolesToUpdate = [roleToUpdate];
      console.log(`API updateUserRole: userId=${userId}, roles=${JSON.stringify(rolesToUpdate)}`);
      const response = await UserService.updateUserRole(userId, rolesToUpdate);
      console.log("API updateUserRole response:", response);
      message.success('Cập nhật vai trò thành công');
      setUsers(users.map(user => user.id === userId ? { ...user, roles: rolesToUpdate } : user));
    } catch (error: any) {
      console.error("Update user role error:", error);
      message.error('Lỗi khi cập nhật vai trò người dùng: ' + (error as Error).message);
    }
  };

  // Sử dụng API getUserById trước khi hiển thị modal
  const handleViewUser = async (user: User) => {
    try {
      console.log("API getUserById: id =", user.id);
      const response = await UserService.getUserById(user.id);
      console.log("API getUserById response:", response);
      if (response.success) {
        setSelectedUser(response.data);
        setIsViewUserModalOpen(true);
        form.setFieldsValue(response.data);
      } else {
        message.error('Không thể lấy thông tin người dùng');
      }
    } catch (error: any) {
      console.error("View user error:", error);
      message.error('Lỗi khi lấy thông tin người dùng: ' + (error as Error).message);
    }
  };

  // Xử lý xóa người dùng
  const handleDeleteUser = async (userId: string) => {
    if (!currentUser || !currentUser.isAdmin()) {
      message.error('Bạn không có quyền xóa người dùng');
      return;
    }
    try {
      console.log("API deleteUser: id =", userId);
      const response = await UserService.deleteUser(userId);
      console.log("API deleteUser response:", response);
      message.success('Xóa người dùng thành công');
      setUsers(users.filter(user => user.id !== userId));
    } catch (error: any) {
      console.error("Delete user error:", error);
      message.error('Lỗi khi xóa người dùng: ' + (error as Error).message);
    }
  };

  // Thêm mới user
  const handleAddUser = () => {
    if (!currentUser || !currentUser.isAdmin()) {
      message.error('Bạn không có quyền thêm người dùng');
      return;
    }
    setIsCreateUserModalOpen(true);
  };

  // Cập nhật thông tin user
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
      setIsViewUserModalOpen(false);
    } catch (error: any) {
      console.error("Update user error:", error);
      message.error('Lỗi khi cập nhật người dùng: ' + (error as Error).message);
    }
  };

  const columns = [
    {
      title: 'Tên Đăng Nhập',
      dataIndex: 'username',
      key: 'username',
      className: 'mainlist-column-name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      className: 'mainlist-column-email',
    },
    {
      title: 'Vai Trò',
      dataIndex: 'roles',
      key: 'roles',
      className: 'mainlist-column-roles',
      render: (roles: { id: string; name: string }[]) =>
        roles
          .map((role) => <span key={role.id}>{role.name}</span>)
          .reduce((prev, curr) => <>{prev}, {curr}</>),
    },
    {
      title: 'Hành Động',
      key: 'action',
      className: 'mainlist-column-actions',
      render: (text: any, record: User) => (
        <span>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewUser(record)}
            className="mainlist-view-btn"
          >
            Xem
          </Button>
          {currentUser && currentUser.isAdmin() && (
            <>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteUser(record.id)}
                style={{ marginLeft: 8 }}
              >
                Xóa
              </Button>
            </>
          )}
        </span>
      ),
    },
  ];

  return (
    <div className="mainlist-container">
      <div className="mainlist-header">
        <h2 className="mainlist-title">Quản Lý Người Dùng</h2>
        {currentUser && currentUser.isAdmin() && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddUser}
            className="mainlist-add-button"
          >
            Thêm Người Dùng
          </Button>
        )}
      </div>

      <div className="mainlist-search-form" style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <Select
          defaultValue="username"
          style={{ width: 150 }}
          onChange={(value: 'id' | 'username' | 'fullname') => handleSearchCategoryChange(value)}
        >
          <Option value="id">Tìm theo ID</Option>
          <Option value="username">Tìm theo tên đăng nhập</Option>
          <Option value="fullname">Tìm theo họ tên</Option>
        </Select>
        <Input
          placeholder="Nhập từ khóa tìm kiếm"
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="mainlist-spin-container">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          className="mainlist-table"
        />
      )}

      <Modal
        title="Thông Tin Người Dùng"
        visible={isViewUserModalOpen && selectedUser !== null}
        onCancel={() => setIsViewUserModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateUser}>
          <Form.Item name="fullname" label="Họ Tên">
            <Input disabled={!currentUser?.isAdmin()} />
          </Form.Item>
          <Form.Item name="username" label="Tên Đăng Nhập">
            <Input disabled />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input disabled />
          </Form.Item>
          <Form.Item name="address" label="Địa Chỉ">
            <Input disabled={!currentUser?.isAdmin()} />
          </Form.Item>
          <Form.Item name="phone" label="Số Điện Thoại">
            <Input disabled={!currentUser?.isAdmin()} />
          </Form.Item>
          {currentUser && currentUser.isAdmin() && (
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Cập Nhật Thông Tin
              </Button>
            </Form.Item>
          )}
        </Form>
        {currentUser && currentUser.isAdmin() && (
          <Form layout="vertical" style={{ marginTop: '20px' }}>
            <Form.Item name="roles" label="Vai Trò">
              <Select
                placeholder="Chọn vai trò"
                style={{ width: '100%' }}
                value={selectedUser ? selectedUser.roles[0]?.id : undefined}
                onChange={(value) => handleRoleChange(selectedUser!.id, value)}
              >
                {roles.map(role => (
                  <Option key={role.id} value={role.id}>
                    {role.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        )}
      </Modal>

      <Modal
        title="Tạo Người Dùng Mới"
        visible={isCreateUserModalOpen}
        onCancel={() => setIsCreateUserModalOpen(false)}
        footer={null}
      >
        {currentUser && currentUser.isAdmin() ? (
          <Form
            layout="vertical"
            onFinish={async (values) => {
              console.log("API createUser, values:", values);
              try {
                const response = await UserService.createUser(values);
                console.log("API createUser response:", response);
                message.success('Tạo người dùng thành công');
                setIsCreateUserModalOpen(false);
                fetchUsers();
              } catch (error: any) {
                console.error("Create user error:", error);
                message.error('Lỗi khi tạo người dùng: ' + (error as Error).message);
              }
            }}
          >
            <Form.Item name="username" label="Tên Đăng Nhập" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Mật Khẩu" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tạo Người Dùng
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <p>Bạn không có quyền tạo người dùng mới.</p>
        )}
      </Modal>
    </div>
  );
};

export default ManagerUser;
