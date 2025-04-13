import React from 'react';
import { Modal } from 'antd';
import { Destination } from '../Content/DestinationTypes';

interface BookingModalProps {
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
  bookingDate: string;
  adultCount: number;
  childCount: number;
  days: number;
  destination: Destination; // Đối tượng đơn
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
  if (!destination) return null;

  const adultPrice = destination.ticketPrice ? destination.ticketPrice.adult_price : (destination.adult_price || 0);
  const childPrice = destination.ticketPrice ? destination.ticketPrice.child_price : (destination.child_price || 0);
  const totalPrice = ((adultCount * adultPrice) + (childCount * childPrice)) * days;

  return (
    <Modal title="Xác nhận đặt vé" visible={isVisible} onOk={onOk} onCancel={onCancel}>
      <p>Ngày đặt: {bookingDate}</p>
      <p>Người lớn: {adultCount}</p>
      <p>Trẻ em: {childCount}</p>
      <p>Số ngày: {days}</p>
      <p>Tổng giá vé: {totalPrice.toLocaleString()} VND</p>
    </Modal>
  );
};

export default BookingModal;
