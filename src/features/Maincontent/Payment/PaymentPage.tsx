// src/features/Maincontent/Payment/PaymentPage.tsx
import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Typography,
  Button,
  CircularProgress,
  Box,
  Paper,
  Divider,
} from '@mui/material';
import moment from 'moment';
import { message } from 'antd';
import '../css/PaymentPage.css';
import PaymentForm, { PaymentMethod } from './PaymentForm';
import useFetchMethods from './UseFetchMethods';
import { Destination } from '../Content/DestinationTypes';
import PaymentDetailService from '../../../service/PaymentDetailService';
import { AuthContext } from './AuthContext';

interface PaymentMethodOption {
  id: string;
  method_name: string;
}

// Component hiển thị thông báo với countdown (6 giây)
const CountdownMessage: React.FC<{ initialTime: number }> = ({ initialTime }) => {
  const [time, setTime] = useState<number>(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span>
      Bạn đã đặt vé thành công. Nhớ kiểm tra điện thoại của quý khách trong thời gian chờ nhân viên CSKH gọi xác nhận. ({time})
    </span>
  );
};

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const bookingData = location.state as {
    booking_date: string;
    adult_tickets: number;
    child_tickets: number;
    status: string;
    days: number;
    destination_id: string;
    ticketPrice: {
      adult_price: number;
      child_price: number;
    };
    bookingId: string;
    destination: Destination;
  };

  // State cho paymentMethod, danh sách paymentMethods, ngân hàng,...
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodOption[]>([]);
  const [banks, setBanks] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const baseUrl = process.env.REACT_APP_BASE_URL || '';

  // Hook useFetchMethods giả sử sẽ set giá trị cho paymentMethods và banks
  useFetchMethods(setPaymentMethods, setBanks, paymentMethod);

  // Nếu mảng vẫn rỗng, sử dụng giá trị mặc định:
  useEffect(() => {
    if (paymentMethods.length === 0) {
      setPaymentMethods([
        { id: 'credit_card', method_name: 'Credit Card' },
        { id: 'bank_transfer', method_name: 'Bank Transfer' },
        { id: 'cash', method_name: 'Cash' },
        { id: 'momo', method_name: 'MoMo' },
        { id: 'zalopay', method_name: 'ZaloPay' },
      ]);
    }
    if (banks.length === 0) {
      setBanks([
        { id: '1', name: 'Ngân hàng A' },
        { id: '2', name: 'Ngân hàng B' },
        { id: '3', name: 'Ngân hàng C' },
      ]);
    }
  }, [paymentMethods, banks]);

  // axiosToken đã đính kèm token theo cấu hình
  const tokenHeader =
    user && user.token ? { Authorization: `Bearer ${user.token}` } : {};

  const mapPaymentMethod = (method: PaymentMethod): PaymentMethod => method || 'cash';

  const handlePayment = async () => {
    setLoading(true);
    const totalPrice =
      (bookingData.adult_tickets * bookingData.ticketPrice.adult_price +
        bookingData.child_tickets * bookingData.ticketPrice.child_price) *
      bookingData.days;

    const paymentData = {
      amount: totalPrice,
      payment_date: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
      status: 'pending' as const,
      booking_id: bookingData.bookingId,
      payment_method: mapPaymentMethod(paymentMethod),
      user_id: user ? user.id : '',
    };

    try {
      const paymentResponse = await PaymentDetailService.createPaymentDetail(paymentData);
      if (paymentResponse.success) {
        const paymentDetailsId = paymentResponse.data._id;
        // Cập nhật trạng thái thành completed (giả sử không dùng QR)
        await PaymentDetailService.updatePaymentDetail(paymentDetailsId, {
          ...paymentData,
          status: 'completed',
        });
        // Hiển thị thông báo countdown rồi chuyển về trang chủ
        showCountdownAndNavigateHome();
      } else {
        message.error('Thanh toán thất bại: Phản hồi không hợp lệ.');
      }
    } catch (error: any) {
      console.error('Payment error:', error.response?.data || error.message);
      message.error('Thanh toán thất bại.');
    } finally {
      setLoading(false);
    }
  };

  const showCountdownAndNavigateHome = () => {
    // Hiển thị message với nội dung CountdownMessage trong 6 giây.
    message.open({
      content: <CountdownMessage initialTime={6} />,
      duration: 6,
    });
    // Chờ 6 giây trước khi chuyển hướng về trang chủ.
    setTimeout(() => {
      navigate('/');
    }, 6000);
  };

  const navigateToPayment = (paymentData: any, totalPrice: number) => {
    // Nếu vẫn cần chuyển hướng sang trang thanh toán, có thể thay đổi tại đây.
    navigate('/payment', {
      state: {
        ...paymentData,
        bookingId: bookingData.bookingId,
        destination: bookingData.destination,
        ticketPrice: {
          adult_price: bookingData.ticketPrice.adult_price,
          child_price: bookingData.ticketPrice.child_price,
        },
        totalPrice,
      },
    });
  };

  const totalPrice =
    (bookingData.adult_tickets * bookingData.ticketPrice.adult_price +
      bookingData.child_tickets * bookingData.ticketPrice.child_price) *
    bookingData.days;

  return (
    <Box className="payment-container" sx={{ display: 'flex', gap: 2, padding: 2 }}>
      <Paper
        elevation={3}
        className="payment-info"
        sx={{ flex: 2, padding: 2, borderRadius: 2 }}
      >
        <Typography variant="h6" gutterBottom>
          Thông tin đặt vé
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1">
          Ngày đặt: {bookingData.booking_date}
        </Typography>
        <Typography variant="body1">
          Người lớn: {bookingData.adult_tickets}
        </Typography>
        <Typography variant="body1">
          Trẻ em: {bookingData.child_tickets}
        </Typography>
        <Typography variant="body1">
          Số ngày: {bookingData.days}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
          Tổng giá vé: {totalPrice.toLocaleString()} VND
        </Typography>
      </Paper>

      <Paper
        elevation={3}
        className="order-summary"
        sx={{ flex: 1, padding: 2, borderRadius: 2 }}
      >
        <Typography variant="h6" gutterBottom>
          Chọn phương thức thanh toán
        </Typography>
        <PaymentForm
          paymentMethods={paymentMethods}
          setPaymentMethod={setPaymentMethod}
          paymentMethod={paymentMethod}
          selectedBank={selectedBank}
          setSelectedBank={setSelectedBank}
          banks={banks}
        />
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={handlePayment}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Xác nhận thanh toán'}
        </Button>
      </Paper>
    </Box>
  );
};

export default PaymentPage;
