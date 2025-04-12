import React from 'react';
import { Form, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

interface DescriptionFileUploadFormProps {
  onNext: () => void;
  onPrev: () => void;
  descriptionFile: File | null;
  setDescriptionFile: (file: File | null) => void;
}

const DescriptionFileUploadForm: React.FC<DescriptionFileUploadFormProps> = ({ onNext, onPrev, descriptionFile, setDescriptionFile }) => {
  const uploadProps: UploadProps = {
    beforeUpload: (file: File) => {
      setDescriptionFile(file);
      return false; // Prevent automatic upload
    },
    onRemove: () => {
      setDescriptionFile(null);
    },
    fileList: descriptionFile ? [{
      uid: '-1',
      name: descriptionFile.name,
      status: 'done' as UploadFile['status'],
    }] : [],
  };

  return (
    <Form 
      layout="vertical" 
      onFinish={onNext}
      className="destlist-create-form"
    >
      <Form.Item
        name="descriptionFile"
        label="File Mô Tả"
      >
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Chọn File</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="destlist-create-submit-btn">
          Tiếp Theo
        </Button>
        <Button onClick={onPrev} style={{ marginLeft: 8 }}>
          Quay Lại
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DescriptionFileUploadForm;
