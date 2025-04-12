import React from 'react';
import { Modal } from 'antd';
import moment from 'moment';
import { Destination } from '../Content/DestinationTypes';

interface BookingModalProps {
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
  bookingDate: string;
  adultCount: number;
  childCount: number;
  days: number;
  destination: Destination | null;
}

const BookingModal: React.FC<BookingModalProps> = ({ isVisible, onOk, onCancel, bookingDate, adultCount, childCount, days, destination }) => {
  if (!destination) return null;

  return (
    <Modal title="Xác nhận đặt vé" visible={isVisible} onOk={onOk} onCancel={onCancel}>
      <p>Ngày đặt: {bookingDate}</p>
      <p>Người lớn: {adultCount}</p>
      <p>Trẻ em: {childCount}</p>
      <p>Số ngày: {days}</p>
      <p>Tổng giá vé: {(adultCount * destination.ticketPrice.adult_price + childCount * destination.ticketPrice.child_price) * days} VND</p>
    </Modal>
  );
};

export default BookingModal;
