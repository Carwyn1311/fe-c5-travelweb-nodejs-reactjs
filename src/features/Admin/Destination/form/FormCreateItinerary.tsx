import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Space } from 'antd';
import moment, { Moment } from 'moment';

interface Activity {
  id: number;
  activity_name: string;
  start_time: Moment | null;
  end_time: Moment | null;
}

interface FormCreateItineraryProps {
  onNext: (values: any) => void;
  onPrev: () => void;
  destinationId: number;
}

const FormCreateItinerary: React.FC<FormCreateItineraryProps> = ({ onNext, onPrev, destinationId }) => {
  const [form] = Form.useForm();
  const [activities, setActivities] = useState<Activity[]>([{ id: Date.now(), activity_name: '', start_time: null, end_time: null }]);
  const [loading, setLoading] = useState<boolean>(false);

  const addActivity = () => {
    setActivities([...activities, { id: Date.now(), activity_name: '', start_time: null, end_time: null }]);
  };

  const removeActivity = (id: number) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const handleActivityChange = (id: number, field: string, value: any) => {
    const updatedActivities = activities.map(activity => {
      if (activity.id === id) {
        return { ...activity, [field]: value };
      }
      return activity;
    });
    setActivities(updatedActivities);
  };

  const handleSubmit = (values: any) => {
    const itinerary = {
      destination: { id: destinationId },
      start_date: values.start_date.format('YYYY-MM-DDTHH:mm:ss'),
      end_date: values.end_date.format('YYYY-MM-DDTHH:mm:ss'),
      activities: activities.map(activity => ({
        activity_name: activity.activity_name,
        start_time: activity.start_time ? activity.start_time.format('YYYY-MM-DDTHH:mm:ss') : '',
        end_time: activity.end_time ? activity.end_time.format('YYYY-MM-DDTHH:mm:ss') : ''
      }))
    };
    onNext(itinerary);
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="start_date"
          label="Ngày Bắt Đầu"
          rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>

        <Form.Item
          name="end_date"
          label="Ngày Kết Thúc"
          rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc' }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>

        <Form.Item label="Hoạt Động">
          {activities.map(activity => (
            <Space key={activity.id} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              <Input
                placeholder="Tên Hoạt Động"
                value={activity.activity_name}
                onChange={e => handleActivityChange(activity.id, 'activity_name', e.target.value)}
                style={{ width: 200 }}
              />
              <DatePicker
                showTime
                placeholder="Thời Gian Bắt Đầu"
                format="YYYY-MM-DD HH:mm:ss"
                value={activity.start_time ? moment(activity.start_time) : null}
                onChange={value => handleActivityChange(activity.id, 'start_time', value)}
              />
              <DatePicker
                showTime
                placeholder="Thời Gian Kết Thúc"
                format="YYYY-MM-DD HH:mm:ss"
                value={activity.end_time ? moment(activity.end_time) : null}
                onChange={value => handleActivityChange(activity.id, 'end_time', value)}
              />
              <Button onClick={() => removeActivity(activity.id)}>Xóa</Button>
            </Space>
          ))}
          <Button type="dashed" onClick={addActivity} style={{ width: '100%' }}>
            Thêm Hoạt Động
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Lưu Hành Trình
          </Button>
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            Quay Lại
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormCreateItinerary;
