// AddCity.tsx
import React, { useEffect, useState } from 'react';
import { Drawer, Form, Input, Button, Select, message } from 'antd';
import '../css/ListMain.css';
import CityService from '../../../models/CityService';

interface AddCityProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface Province {
  id: string;
  name: string;
  country?: string;
}

const AddCity: React.FC<AddCityProps> = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [provinces, setProvinces] = useState<Province[]>([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        // Giả sử API lấy danh sách tỉnh có đường dẫn '/provinces'
        const response = await CityService.getCities(); // Không cần thiết, ta nên gọi axiosToken trên api province!
        // Tuy nhiên, nếu bạn đã tích hợp API province riêng thì thay thế bằng ProvinceService.getProvinces()
        // Ở đây demo: dùng axiosToken để lấy danh sách tỉnh, hoặc bạn có thể lấy từ một service riêng.
        // Giả sử API /provinces trả về danh sách tỉnh
        const res = await fetch('/provinces').then(res => res.json());
        setProvinces(res);
      } catch (error) {
        message.error('Lỗi khi tải danh sách tỉnh');
      }
    };
    fetchProvinces();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      await CityService.createCity(values.name, values.description || '', values.provinceId);
      message.success('Tạo thành phố thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi tạo thành phố');
    }
  };

  return (
    <Drawer
      title="Thêm Thành Phố Mới"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={360}
      className="citylist-create-drawer"
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="name" label="Tên Thành Phố" rules={[{ required: true, message: 'Vui lòng nhập tên thành phố' }]}>
          <Input placeholder="Nhập tên thành phố" />
        </Form.Item>
        <Form.Item name="description" label="Mô Tả">
          <Input placeholder="Nhập mô tả" />
        </Form.Item>
        <Form.Item name="provinceId" label="Tỉnh" rules={[{ required: true, message: 'Vui lòng chọn tỉnh' }]}>
          <Select placeholder="Chọn tỉnh">
            {provinces.map((province) => (
              <Select.Option key={province.id} value={province.id}>
                {province.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tạo Thành Phố
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddCity;
