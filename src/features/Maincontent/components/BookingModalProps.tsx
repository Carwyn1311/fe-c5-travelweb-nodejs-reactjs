import React, { useState, useEffect } from 'react';
import { Modal, InputNumber, Form, DatePicker } from 'antd';
import moment from 'moment';

interface BookingModalProps {
  isVisible: boolean;
  onOk: (bookingData: any) => void;
  onCancel: () => void;
  bookingDate: string;
  adultCount: number;
  childCount: number;
  days: number;
  destination: {
    _id: string;
    name: string;
    ticketPrice: {
      adult_price: number;
      child_price: number;
    };
    [key: string]: any;
  };
}

const BookingModal: React.FC<BookingModalProps> = ({
  isVisible,
  onOk,
  onCancel,
  bookingDate,
  adultCount,
  childCount,
  days,
  destination,
}) => {
  const [localAdultCount, setLocalAdultCount] = useState<number>(adultCount);
  const [localChildCount, setLocalChildCount] = useState<number>(childCount);
  const [localBookingDate, setLocalBookingDate] = useState<string>(bookingDate);

  useEffect(() => {
    if (isVisible) {
      setLocalAdultCount(adultCount);
      setLocalChildCount(childCount);
      setLocalBookingDate(bookingDate);
    }
  }, [isVisible, adultCount, childCount, bookingDate]);

  const handleOk = () => {
    if (!localBookingDate) {
      Modal.error({ title: 'Lỗi', content: 'Vui lòng chọn ngày đặt vé.' });
      return;
    }

    const bookingData = {
      booking_date: moment(localBookingDate).format('YYYY-MM-DDTHH:mm:ss.SSS'),
      adult_tickets: localAdultCount,
      child_tickets: localChildCount,
      days,
      destination_id: destination._id,
    };
    onOk(bookingData);
  };

  return (
    <Modal
      visible={isVisible}
      title={`Đặt vé cho ${destination?.name || ''}`}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Xác nhận"
      cancelText="Hủy"
    >
      <Form layout="vertical">
        <Form.Item label="Ngày đặt" required>
          <DatePicker
            showTime
            value={localBookingDate ? moment(localBookingDate) : undefined}
            onChange={(date) =>
              setLocalBookingDate(
                date ? moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS') : ''
              )
            }
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Số vé người lớn">
          <InputNumber
            min={1}
            value={localAdultCount}
            onChange={(value) => setLocalAdultCount(value || 1)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Số vé trẻ em">
          <InputNumber
            min={0}
            value={localChildCount}
            onChange={(value) => setLocalChildCount(value || 0)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Số ngày">
          <InputNumber value={days} disabled style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookingModal;