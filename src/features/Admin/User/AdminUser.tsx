import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Modal, message, Button, Input, Form, Select, Spin } from 'antd';
import { PlusOutlined, EyeOutlined } from '@ant-design/icons';
import axiosInstanceToken from '../../AxiosInterceptor/Content/axioslnterceptorToken';
import '../css/ListMain.css'; 

const { Option } = Select;

interface User {
  id: number;
  fullname: string | null;
  username: string;
  email: string;
  address: string | null;
  phone: string | null;
  roles: { id: number; name: string }[];
}

interface Role {
  id: number;
  name: string;
}

const AdminUser: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewUserModalOpen, setIsViewUserModalOpen] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [form] = Form.useForm();
  const successMessageShownRef = useRef(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstanceToken.get('/api/list-user');
      setUsers(response.data);
      if (!successMessageShownRef.current) {
        message.success('Tải danh sách người dùng thành công');
        successMessageShownRef.current = true;
      }
    } catch (error) {
      message.error('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axiosInstanceToken.get('/api/roles');
      setRoles(response.data);
    } catch (error) {
      message.error('Không thể tải danh sách vai trò');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleRoleChange = async (userId: number, roleId: number) => {
    try {
      const roleToUpdate = roles.find(role => role.id === roleId);
      if (!roleToUpdate) return;

      const rolesToUpdate = [roleToUpdate];
      await axiosInstanceToken.put(`/api/${userId}/roles`, rolesToUpdate);

      message.success('Cập nhật vai trò thành công');
      setUsers(users.map(user => user.id === userId ? { ...user, roles: rolesToUpdate } : user));
    } catch (error: any) {
      if (error instanceof Error) {
        message.error('Lỗi khi cập nhật vai trò người dùng: ' + error.message);
      } else {
        message.error('Lỗi không xác định khi cập nhật vai trò người dùng');
      }
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewUserModalOpen(true);
    form.setFieldsValue(user);
  };

  const handleAddUser = () => {
    setIsCreateUserModalOpen(true);
  };

  const handleUpdateUser = async (values: any) => {
    if (!selectedUser) return;

    try {
      const response = await axiosInstanceToken.put(`/api/update-user/${selectedUser.username}`, values);

      message.success('Cập nhật người dùng thành công');
      setUsers(users.map(user => (user.id === selectedUser.id ? { ...selectedUser, ...values } : user)));
      setIsViewUserModalOpen(false);
    } catch (error: any) {
      message.error('Lỗi khi cập nhật người dùng: ' + (error as Error).message);
    }
  };

  const columns = [
    {
      title: 'Tên Đăng Nhập',
      dataIndex: 'username',
      key: 'username',
      className: 'mainlist-column-name', // Sử dụng lớp CSS chính mới
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      className: 'mainlist-column-email', // Sử dụng lớp CSS chính mới
    },
    { 
      title: 'Vai Trò', 
      dataIndex: 'roles', 
      key: 'roles', 
      className: 'mainlist-column-roles', // Sử dụng lớp CSS chính mới
      render: (roles: { id: number; name: string }[], record: User) => (
        roles.map(role => role.name).join(', ') 
      ), 
    },
    {
      title: 'Hành Động',
      key: 'action',
      className: 'mainlist-column-actions', // Sử dụng lớp CSS chính mới
      render: (text: any, record: User) => (
        <span>
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => handleViewUser(record)}
            className="mainlist-view-btn" // Sử dụng lớp CSS chính mới
          >
            Xem
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div className="mainlist-container"> {/* Sử dụng lớp CSS chính mới */}
      <div className="mainlist-header"> {/* Sử dụng lớp CSS chính mới */}
        <h2 className="mainlist-title">Quản Lý Người Dùng</h2> {/* Sử dụng lớp CSS chính mới */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddUser}
          className="mainlist-add-button" // Sử dụng lớp CSS chính mới
        >
          Thêm Người Dùng
        </Button>
      </div>

      <Form layout="inline" className="mainlist-search-form"> {/* Sử dụng lớp CSS chính mới */}
        <Form.Item>
          <Input
            placeholder="Tìm kiếm người dùng"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="mainlist-search-input" // Sử dụng lớp CSS chính mới
          />
        </Form.Item>
      </Form>

      {loading ? (
        <div className="mainlist-spin-container"> {/* Sử dụng lớp CSS chính mới */}
          <Spin size="large" /> 
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          className="mainlist-table" // Sử dụng lớp CSS chính mới
        />
      )}

      <Modal
        title="Thông Tin Người Dùng"
        visible={isViewUserModalOpen && selectedUser !== null}
        onCancel={() => setIsViewUserModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateUser}
        >
          <Form.Item name="fullname" label="Họ Tên">
            <Input />
          </Form.Item>
          <Form.Item name="username" label="Tên Đăng Nhập">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Địa Chỉ">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Số Điện Thoại">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Cập Nhật Thông Tin</Button>
          </Form.Item>
        </Form>
        <Form
          layout="vertical"
          style={{ marginTop: '20px' }}
        >
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
      </Modal>

      <Modal
        title="Tạo Người Dùng Mới"
        visible={isCreateUserModalOpen}
        onCancel={() => setIsCreateUserModalOpen(false)}
        footer={null}
      >
        {/* Render CreateUserForm here */}
      </Modal>
    </div>
  );
};

export default AdminUser;
