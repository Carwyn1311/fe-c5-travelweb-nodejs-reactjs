// EditProvince.tsx
import React, { useEffect } from 'react';
import { Drawer, Form, Input, Button, message } from 'antd';
import { Province } from '../../../models/Provinces';
import ProvinceService from '../../../service/ProvinceService';


interface EditProvinceProps {
  visible: boolean;
  province: Province;
  onClose: () => void;
  onSuccess: () => void;
}

const EditProvince: React.FC<EditProvinceProps> = ({ visible, province, onClose, onSuccess }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: province.name,
      country: province.country
    });
  }, [province, form]);

  const handleUpdate = async (values: any) => {
    try {
      await ProvinceService.updateProvince(province.id, values);
      message.success('Cập nhật tỉnh thành công');
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Lỗi khi cập nhật tỉnh:', error);
      message.error('Lỗi khi cập nhật tỉnh');
    }
  };

  return (
    <Drawer
      title="Cập Nhật Tỉnh"
      width={360}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Form.Item
          name="name"
          label="Tên Tỉnh"
          rules={[{ required: true, message: 'Vui lòng nhập tên Tỉnh' }]}
        >
          <Input placeholder="Tên Tỉnh" />
        </Form.Item>
        <Form.Item
          name="country"
          label="Quốc Gia"
          rules={[{ required: true, message: 'Vui lòng nhập Quốc Gia' }]}
        >
          <Input placeholder="Quốc Gia" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập Nhật
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditProvince;
