import React, { useState } from 'react';
import { 
  Drawer, 
  Form, 
  Input, 
  Button, 
  Select, 
  Upload, 
  message 
} from 'antd';
import { 
  PlusOutlined, 
  UploadOutlined 
} from '@ant-design/icons';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';


const { Option } = Select;

interface FormCreateDestinationProps {
  onClose: () => void;
  onSuccess: () => void;
}

const FormCreateDestination: React.FC<FormCreateDestinationProps> = ({ 
  onClose, 
  onSuccess 
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  const handleSubmit = async (values: any) => {
    try {
      // Tạo điểm đến
      const destResponse = await axiosInstance.post('/api/dest/create', {
        name: values.name,
        description: values.description,
        location: values.location,
        type: values.type,
        city: values.city
      });

      // Upload ảnh
      if (fileList.length > 0) {
        const formData = new FormData();
        fileList.forEach((file) => {
          formData.append('images', file.originFileObj);
        });

        await axiosInstance.post(`/api/dest/img`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      message.success('Tạo điểm đến thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi tạo điểm đến');
    }
  };

  return (
    <Drawer
      title="Thêm Điểm Đến Mới"
      placement="right"
      onClose={onClose}
      open={true}
      className="destlist-create-drawer"
    >
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={handleSubmit}
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
          name="type"
          label="Loại Điểm Đến"
          rules={[{ required: true, message: 'Vui lòng chọn loại điểm đến' }]}
        >
          <Select placeholder="Chọn loại điểm đến">
            <Option value="DOMESTIC">Trong Nước</Option>
            <Option value="INTERNATIONAL">Quốc Tế</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="city"
          label="Thành Phố"
          rules={[{ required: true, message: 'Vui lòng nhập mã thành phố' }]}
        >
          <Input type="number" placeholder="Nhập mã thành phố" />
        </Form.Item>

        <Form.Item
          name="images"
          label="Hình Ảnh"
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            multiple
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit"
            className="destlist-create-submit-btn"
          >
            Tạo Điểm Đến
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default FormCreateDestination;