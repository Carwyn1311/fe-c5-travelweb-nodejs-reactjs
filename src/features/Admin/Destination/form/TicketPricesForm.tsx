import React from 'react';
import { Form, Input, Button } from 'antd';

interface TicketPricesFormProps {
  onFinish: (values: any) => void;
  onPrev: () => void;
  loading: boolean;
}

const TicketPricesForm: React.FC<TicketPricesFormProps> = ({ onFinish, onPrev, loading }) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="destlist-create-form"
    >
      <Form.Item
        name="adult_price"
        label="Giá Vé Người Lớn"
        rules={[{ required: true, message: 'Vui lòng nhập giá vé người lớn' }]}
      >
        <Input type='number' placeholder="Nhập giá vé người lớn" />
      </Form.Item>

      <Form.Item
        name="child_price"
        label="Giá Vé Trẻ Em"
        rules={[{ required: true, message: 'Vui lòng nhập giá vé trẻ em' }]}
      >
        <Input type='number' placeholder="Nhập giá vé trẻ em" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Hoàn Tất
        </Button>
        <Button onClick={onPrev} style={{ marginLeft: 8 }}>
          Quay Lại
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TicketPricesForm;
