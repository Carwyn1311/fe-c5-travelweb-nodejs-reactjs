import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

interface City {
  id: number;
  name: string;
  province: number;
}

interface DestinationInfoFormProps {
  onNext: (values: any) => void;
  cities: City[];
  loading: boolean;
}

const DestinationInfoForm: React.FC<DestinationInfoFormProps> = ({ onNext, cities, loading }) => {
  const [form] = Form.useForm();

  return (
    <Form 
      form={form} 
      layout="vertical" 
      onFinish={onNext}
      className="destlist-create-form"
    >
      <Form.Item
        name="name"
        label="Tên Điểm Đến"
        rules={[{ required: true, message: 'Vui lòng nhập tên điểm đến' }]}
      >
        <Input placeholder="Nhập tên điểm đến" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Mô Tả"
      >
        <Input.TextArea placeholder="Nhập mô tả" />
      </Form.Item>

      <Form.Item
        name="location"
        label="Địa Điểm"
        rules={[{ required: true, message: 'Vui lòng nhập địa điểm' }]}
      >
        <Input placeholder="Nhập địa điểm" />
      </Form.Item>

      <Form.Item
        name="city"
        label="Thành Phố"
        rules={[{ required: true, message: 'Vui lòng chọn thành phố' }]}
      >
        <Select placeholder="Chọn thành phố" loading={loading}>
          {cities.map(city => (
            <Option key={city.id} value={city.id}>
              {city.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="destlist-create-submit-btn">
          Tiếp Theo
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DestinationInfoForm;
