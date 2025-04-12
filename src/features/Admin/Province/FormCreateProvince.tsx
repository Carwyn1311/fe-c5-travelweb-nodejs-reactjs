import React, { useEffect, useState } from 'react';
import { Drawer, Form, Input, Button, message } from 'antd';
import axiosInstanceToken from '../../AxiosInterceptor/Content/axioslnterceptorToken';
import '../css/ListMain.css';

interface FormCreateProvinceProps {
  onClose: () => void;
  onSuccess: () => void;
}

const FormCreateProvince: React.FC<FormCreateProvinceProps> = ({ onClose, onSuccess }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      const data = {
        name: values.name,
        country: values.country
      };

      await axiosInstanceToken.post('/api/province/create', data);
      message.success('Tạo tỉnh thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi tạo tỉnh');
    }
  };

  return (
    <Drawer
      title="Thêm Tỉnh Mới"
      placement="right"
      onClose={onClose}
      open={true}
      className="provincelist-create-drawer"
    >
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={handleSubmit}
        className="provincelist-create-form"
      >
        <Form.Item
          name="name"
          label="Tên Tỉnh"
          rules={[{ 
            required: true, 
            message: 'Vui lòng nhập tên Tỉnh' 
          }]}
        >
          <Input placeholder="Nhập tên Tỉnh" className="provincelist-create-form-label"/>
        </Form.Item>

        <Form.Item
          name="country"
          label="Quốc Gia"
          rules={[{ 
            required: true, 
            message: 'Vui lòng nhập Quốc Gia' 
          }]}
        >
          <Input placeholder="Nhập Quốc Gia" className="provincelist-create-form-label"/>
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit"
            className="provincelist-create-submit-btn"
          >
            Tạo Tỉnh
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default FormCreateProvince;
