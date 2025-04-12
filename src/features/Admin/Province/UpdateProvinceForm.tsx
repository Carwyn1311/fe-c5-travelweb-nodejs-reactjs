import React, { useEffect } from 'react';
import { Form, Input, Button, Drawer, message } from 'antd';
import axiosInstanceToken from '../../AxiosInterceptor/Content/axioslnterceptorToken';
// Import the Province type from listdest
import { Province } from '../../Admin/Destination/listdest';

interface UpdateProvinceFormProps {
  visible: boolean;
  onClose: () => void;
  province: Province | null;
  fetchProvinces: () => void;
}

const UpdateProvinceForm: React.FC<UpdateProvinceFormProps> = ({ visible, onClose, province, fetchProvinces }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (province) {
      form.setFieldsValue(province);
    }
  }, [province, form]);

  const handleUpdate = async (values: Province) => {
    try {
      const response = await axiosInstanceToken.put(`/api/province/${province?.id}`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      message.success('Province updated successfully');
      fetchProvinces();
      onClose();
    } catch (error) {
      console.error('Error updating province:', error);
      message.error('Failed to update province');
    }
  };

  return (
    <Drawer
      title="Update Province"
      width={360}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Form.Item name="name" label="Province Name" rules={[{ required: true, message: 'Please enter the province name' }]}>
          <Input placeholder="Province Name" />
        </Form.Item>
        <Form.Item name="country" label="Country" rules={[{ required: true, message: 'Please enter the country' }]}>
          <Input placeholder="Country" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Update</Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UpdateProvinceForm;
