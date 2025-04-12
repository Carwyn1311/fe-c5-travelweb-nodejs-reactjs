import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import moment from 'moment';
import '../css/TicketSection.css'; 

interface TicketSectionProps {
  bookingDate: string;
  setBookingDate: (date: string) => void;
  adultCount: number;
  setAdultCount: (value: number) => void;
  childCount: number;
  setChildCount: (value: number) => void;
  days: number;
  setDays: (value: number) => void;
  handleBookNow: () => void;
  ticketPrice: { adult_price: number; child_price: number };
}

const TicketSection: React.FC<TicketSectionProps> = ({
  bookingDate,
  setBookingDate,
  adultCount,
  setAdultCount,
  childCount,
  setChildCount,
  days,
  setDays,
  handleBookNow,
  ticketPrice
}) => {
  const totalPrice = (adultCount * ticketPrice.adult_price + childCount * ticketPrice.child_price) * days;

  return (
    <div className="ticket-section">
      <h2>Giá vé</h2>
      <p>Người lớn: {ticketPrice.adult_price} VND</p>
      <p>Trẻ em: {ticketPrice.child_price} VND</p>
      <Form layout="inline" className="ticket-form">
        <Form.Item label="Ngày đặt">
          <DatePicker
            value={moment(bookingDate)}
            onChange={(date) => {
              if (date) {
                setBookingDate(date.format("YYYY-MM-DDTHH:mm:ss.SSS"));
              }
            }}
          />
        </Form.Item>
        <Form.Item label="Người lớn">
          <Input type="number" min="1" value={adultCount} onChange={(e) => setAdultCount(Number(e.target.value))} />
        </Form.Item>
        <Form.Item label="Trẻ em">
          <Input type="number" min="0" value={childCount} onChange={(e) => setChildCount(Number(e.target.value))} />
        </Form.Item>
        <Form.Item label="Số ngày">
          <Input type="number" min="1" value={days} onChange={(e) => setDays(Number(e.target.value))} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleBookNow}>Đặt vé</Button>
        </Form.Item>
      </Form>
      <div className="total-price">
        <h3>Tổng giá: {totalPrice} VND</h3>
      </div>
    </div>
  );
};

export default TicketSection;
