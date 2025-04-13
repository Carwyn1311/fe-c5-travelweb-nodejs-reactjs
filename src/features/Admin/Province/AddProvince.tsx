// AddProvince.tsx
import React from 'react';
import { Drawer, Form, Input, Button, message } from 'antd';
import ProvinceService from '../../../service/ProvinceService';

interface AddProvinceProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddProvince: React.FC<AddProvinceProps> = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      await ProvinceService.createProvince(values.name, values.country);
      message.success('Tạo tỉnh thành công');
      onSuccess();
      onClose();
    } catch (error: any) {
      message.error('Lỗi khi tạo tỉnh');
    }
  };

  return (
    <Drawer
      title="Thêm Tỉnh Mới"
      placement="right"
      onClose={onClose}
      visible={visible}
      className="provincelist-create-drawer"
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} className="provincelist-create-form">
        <Form.Item
          name="name"
          label="Tên Tỉnh"
          rules={[{ required: true, message: 'Vui lòng nhập tên Tỉnh' }]}
        >
          <Input placeholder="Nhập tên Tỉnh" className="provincelist-create-form-label" />
        </Form.Item>
        <Form.Item
          name="country"
          label="Quốc Gia"
          rules={[{ required: true, message: 'Vui lòng nhập Quốc Gia' }]}
        >
          <Input placeholder="Nhập Quốc Gia" className="provincelist-create-form-label" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="provincelist-create-submit-btn">
            Tạo Tỉnh
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddProvince;
