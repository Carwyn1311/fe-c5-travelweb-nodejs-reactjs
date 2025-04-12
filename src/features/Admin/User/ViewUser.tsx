// ViewUser.tsx
import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { IUser, IRole } from './ManagerUser';

interface IViewUserProps {
  visible: boolean;
  user: IUser;
  onClose: () => void;
  onUpdateUser: (values: any) => Promise<void>;
  roles: IRole[];
  onRoleChange: (roleId: string) => void;
  currentUser: any;
}

const ViewUser: React.FC<IViewUserProps> = ({
  visible,
  user,
  onClose,
  onUpdateUser,
  roles,
  onRoleChange,
  currentUser,
}) => {
  const [form] = Form.useForm();
  
  const handleFinish = async (values: any) => {
    await onUpdateUser(values);
    form.resetFields();
  };

  return (
    <Modal
      title="Thông Tin Người Dùng"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={user}>
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
        <Form layout="vertical" style={{ marginTop: 20 }}>
          <Form.Item name="roles" label="Vai Trò">
            <Form.Item noStyle>
              <select
                defaultValue={user.roles && user.roles[0]?.id}
                onChange={(e) => onRoleChange(e.target.value)}
              >
                <option value="">Chọn vai trò</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </Form.Item>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default ViewUser;
