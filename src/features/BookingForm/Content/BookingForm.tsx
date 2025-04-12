// BookingForm.js
import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, message, DatePicker, Select } from 'antd';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import moment from 'moment';

const { Option } = Select;

const BookingForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    console.log('Form data submitted:', values);
    setLoading(true);

    // Định dạng lại dữ liệu trước khi gửi
    const formattedValues = {
      ...values,
      booking_date: values.booking_date.format('YYYY-MM-DDTHH:mm:ss'),
    };

    try {
      // Gửi dữ liệu đến server bằng axiosInstance
      const response = await axiosInstance.post('/api/bookings/create', formattedValues, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      // Kiểm tra dữ liệu phản hồi và xử lý
      if (response.data && response.data !== undefined) {
        console.log('Response from server:', response.data);
        message.success('Booking created successfully!');
      } else {
        throw new Error('Invalid response data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('There was an error creating the booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          booking_date: moment(),
          adult_tickets: 1,
          child_tickets: 0,
          status: 'pending',
          days: 1,
          destination_id: null,
        }}
      >
        <Form.Item
          label="Booking Date"
          name="booking_date"
          rules={[{ required: true, message: 'Please select the booking date!' }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Adult Tickets"
          name="adult_tickets"
          rules={[{ required: true, message: 'Please enter the number of adult tickets!' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Child Tickets"
          name="child_tickets"
          rules={[{ required: true, message: 'Please enter the number of child tickets!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please select the status!' }]}
        >
          <Select>
            <Option value="pending">Pending</Option>
            <Option value="confirmed">Confirmed</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Number of Days"
          name="days"
          rules={[{ required: true, message: 'Please enter the number of days!' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Destination ID"
          name="destination_id"
          rules={[{ required: true, message: 'Please enter the destination ID!' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BookingForm;
