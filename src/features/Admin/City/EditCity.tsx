// EditCity.tsx
import React, { useEffect, useState } from 'react';
import { Drawer, Form, Input, Button, Select, message } from 'antd';

import '../css/ListMain.css';
import { City } from '../../../models/City';
import CityService from '../../../models/CityService';

interface EditCityProps {
  visible: boolean;
  city: City;
  onClose: () => void;
  onSuccess: () => void;
}

interface Province {
  id: string;
  name: string;
  country?: string;
}

const EditCity: React.FC<EditCityProps> = ({ visible, city, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [provinces, setProvinces] = useState<Province[]>([]);

  useEffect(() => {
    form.setFieldsValue({
      name: city.name,
      description: city.description,
      provinceId: city.provinceId,
    });
    const fetchProvinces = async () => {
      try {
        const res = await fetch('/provinces').then(res => res.json());
        setProvinces(res);
      } catch (error) {
        message.error('Lỗi khi tải danh sách tỉnh');
      }
    };
    fetchProvinces();
  }, [city, form]);

  const handleSubmit = async (values: any) => {
    try {
      await CityService.updateCity(city.id, {
        name: values.name,
        description: values.description,
        province_id: values.provinceId,
      });
      message.success('Cập nhật thành phố thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi cập nhật thành phố');
    }
  };

  return (
    <Drawer
      title="Cập Nhật Thành Phố"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={360}
      className="citylist-update-drawer"
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
            Cập Nhật Thành Phố
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditCity;
