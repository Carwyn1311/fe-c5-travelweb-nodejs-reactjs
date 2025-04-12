// AddUser.tsx
import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';

interface IAddUserProps {
  visible: boolean;
  onClose: () => void;
  onCreateUser: (values: any) => Promise<void>;
}

const AddUser: React.FC<IAddUserProps> = ({ visible, onClose, onCreateUser }) => {
  const [form] = Form.useForm();
  
  const handleFinish = async (values: any) => {
    await onCreateUser(values);
    form.resetFields();
  };

  return (
    <Modal
      title="Tạo Người Dùng Mới"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
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
    </Modal>
  );
};

export default AddUser;
