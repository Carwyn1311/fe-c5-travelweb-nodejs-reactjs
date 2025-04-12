import React, { useState } from 'react';
import { Form, Input, Button, Select, Switch, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './CreateUserForm.css';
import { User } from '../User/Content/User';
import { TokenAuthService } from '../TokenAuthService/TokenAuthService';
import axiosInstance from '../AxiosInterceptor/Content/axiosInterceptor';

const { Option } = Select;

interface CreateUserFormProps {
  onUserCreated: (user: User) => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onUserCreated }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);

    // Tạo đối tượng người dùng mới với role là "ADMIN" hoặc "USER" tùy chọn
    const newUser = {
      username: values.username,
      email: values.email,
      password: values.password,
      role: values.role,  // Giữ nguyên giá trị "ADMIN" hoặc "USER"
      active: values.active,
    };

    try {
      // Lấy token từ TokenAuthService
      const token = TokenAuthService.getToken() || TokenAuthService.getSessionData('token');
      
      if (!token) {
        message.error('Bạn cần đăng nhập để thực hiện tác vụ này.');
        setLoading(false);
        return;
      }

      // Gọi API sử dụng axiosInstance
      const response = await axiosInstance.post('/admin/users/create', newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      // Kiểm tra phản hồi API
      if (response && response.data) {
        console.log('User created successfully:', response.data);
        onUserCreated(response.data); // Giả sử bạn muốn gọi hàm này để thêm người dùng vào danh sách
        message.success('Tạo người dùng thành công!');
      } else {
        console.error('Response from API is empty');
        message.error('Không nhận được dữ liệu hợp lệ từ API.');
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Có lỗi xảy ra khi tạo người dùng.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ role: 'USER', active: true }}
      >
        <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input username!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input email!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input password!' }]}>
          <Input.Password iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
        </Form.Item>
        <Form.Item label="Role" name="role" initialValue="USER">
          <Select>
            <Option value="USER">User</Option>
            <Option value="ADMIN">Admin</Option>
          </Select>
        </Form.Item>
        <Form.Item name="active" label="Active" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Create User</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateUserForm;
