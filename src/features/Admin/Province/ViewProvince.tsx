// ViewProvince.tsx
import React, { useEffect } from 'react';
import { Drawer, Form, Input, Button } from 'antd';
import { Province } from '../../../models/Provinces';


interface ViewProvinceProps {
  visible: boolean;
  onClose: () => void;
  province: Province;
}

const ViewProvince: React.FC<ViewProvinceProps> = ({ visible, onClose, province }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(province);
  }, [province, form]);

  return (
    <Drawer
      title="Thông Tin Tỉnh"
      width={360}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Tên Tỉnh" name="name">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Quốc Gia" name="country">
          <Input disabled />
        </Form.Item>
        {/* Nếu cần hiển thị thêm các trường hoặc danh sách cities, bổ sung ở đây */}
      </Form>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={onClose} type="primary">
          Đóng
        </Button>
      </div>
    </Drawer>
  );
};

export default ViewProvince;
