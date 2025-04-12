import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Drawer, Select, message, Upload, Modal } from 'antd';
import { UploadOutlined, DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axiosInstanceToken from '../../../AxiosInterceptor/Content/axioslnterceptorToken';
import { City, Destination, DestinationImage } from '../listdest';
import { UploadProps, UploadFile } from 'antd/es/upload/interface';

const { Option } = Select;
const { confirm } = Modal;

interface FormUpdateDestinationProps {
  visible: boolean;
  onClose: () => void;
  destination: Destination | null;
  onSuccess: () => void;
}

const FormUpdateDestination: React.FC<FormUpdateDestinationProps> = ({ visible, onClose, destination, onSuccess }) => {
  const [form] = Form.useForm();
  const [ticketPriceForm] = Form.useForm();
  const [cities, setCities] = useState<City[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [images, setImages] = useState<DestinationImage[]>([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axiosInstanceToken.get('/api/city/list');
        setCities(response.data);
      } catch (error) {
        console.error('Lỗi khi tải danh sách các thành phố:', error);
        message.error('Lỗi khi tải danh sách các thành phố');
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    if (destination) {
      form.setFieldsValue({
        ...destination,
        city: destination.city.id,
      });

      if (destination.ticketPrice) {
        ticketPriceForm.setFieldsValue(destination.ticketPrice);
      }

      if (destination.destinationImages) {
        setImages(destination.destinationImages);
      }
    }
  }, [destination, form, ticketPriceForm]);

  const getBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleUpdate = async (values: any) => {
    try {
      const updateValues = {
        id: destination?.id,
        ...values,
        city: { id: values.city },
      };

      await axiosInstanceToken.put(`/api/dest/update`, updateValues, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const ticketPriceValues = ticketPriceForm.getFieldsValue();
      await axiosInstanceToken.put(`/api/ticketprices/${destination?.ticketPrice?.id}`, ticketPriceValues, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (fileList.length > 0) {
        const imagesToSave = await Promise.all(fileList.map(async (file: UploadFile) => {
          const base64 = await getBase64(file.originFileObj as File);
          return {
            destination: { id: destination?.id },
            image_url: base64
          };
        }));

        await axiosInstanceToken.post('/api/dest/img', imagesToSave, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        message.success('Tải lên ảnh mới thành công');
      }

      message.success('Cập nhật điểm đến thành công');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Lỗi khi cập nhật điểm đến:', error);
      message.error('Lỗi khi cập nhật điểm đến');
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa ảnh này?',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        try {
          await axiosInstanceToken.delete(`/api/dest/img/${imageId}`);
          setImages(prevImages => prevImages.filter(image => image.id !== imageId));
          message.success('Xóa ảnh thành công');
        } catch (error) {
          console.error('Lỗi khi xóa ảnh:', error);
          message.error('Lỗi khi xóa ảnh');
        }
      }
    });
  };

  const uploadProps: UploadProps = {
    onChange: ({ fileList }) => setFileList(fileList),
    listType: "picture-card",
    multiple: true
  };

  return (
    <Drawer
      title="Cập Nhật Điểm Đến"
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Form.Item name="name" label="Tên Điểm Đến" rules={[{ required: true, message: 'Vui lòng nhập tên điểm đến' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô Tả">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="location" label="Địa Điểm" rules={[{ required: true, message: 'Vui lòng nhập địa điểm' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="city" label="Thành Phố" rules={[{ required: true, message: 'Vui lòng chọn thành phố' }]}>
          <Select placeholder="Chọn thành phố">
            {cities.map(city => (
              <Option key={city.id} value={city.id}>
                {city.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form form={ticketPriceForm} layout="vertical">
          <Form.Item name="adult_price" label="Giá Vé Người Lớn">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="child_price" label="Giá Vé Trẻ Em">
            <Input type="number" />
          </Form.Item>
        </Form>
        <Form.Item label="Ảnh hiện tại">
          {images.map(image => (
            <div key={image.id} style={{ marginBottom: '10px' }}>
              <img src={`${baseUrl}${image.image_url}`} alt="Destination" style={{ width: '100%', maxHeight: '150px', objectFit: 'cover' }} />
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteImage(image.id)}
                danger
                style={{ marginTop: '5px' }}
              >
                Xóa ảnh
              </Button>
            </div>
          ))}
        </Form.Item>
        <Form.Item label="Thêm Ảnh Mới">
          <Upload {...uploadProps}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Cập Nhật</Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default FormUpdateDestination;
