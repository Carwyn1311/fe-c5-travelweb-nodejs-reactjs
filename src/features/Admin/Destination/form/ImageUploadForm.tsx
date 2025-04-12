import React from 'react';
import { Form, Button, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface ImageUploadFormProps {
  onNext: () => void;
  onPrev: () => void;
  fileList: any[];
  setFileList: (fileList: any[]) => void;
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ onNext, onPrev, fileList, setFileList }) => {
  return (
    <Form 
      layout="vertical" 
      onFinish={onNext}
      className="destlist-create-form"
    >
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

export default ImageUploadForm;
