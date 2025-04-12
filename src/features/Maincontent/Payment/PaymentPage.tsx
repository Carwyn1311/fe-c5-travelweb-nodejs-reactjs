import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Button, CircularProgress, Box, Paper, Divider, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import axiosInstanceToken from '../../AxiosInterceptor/Content/axioslnterceptorToken';
import { message } from 'antd';
import '../css/PaymentPage.css';

import PaymentForm from './PaymentForm';
import QRCodeDisplay from './QRCodeDisplay';
import useFetchMethods from './UseFetchMethods';
import { Destination } from '../Content/DestinationTypes';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const bookingData = location.state as {
    booking_date: string;
    adult_tickets: number;
    child_tickets: number;
    status: string;
    days: number;
    destination_id: number;
    ticketPrice: {
      adult_price: number;
      child_price: number;
    };
    bookingId: number;
    destination: Destination;
  };

  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [paymentMethods, setPaymentMethods] = useState<Array<{ id: string; method_name: string }>>([]);
  const [banks, setBanks] = useState<Array<{ id: string; name: string }>>([]);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(120);
  const [showPaymentForm, setShowPaymentForm] = useState<boolean>(true);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useFetchMethods(setPaymentMethods, setBanks, paymentMethod);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (qrCodeUrl) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      setQrCodeUrl('');
      setShowPaymentForm(true);
      message.warning('QR code đã hết hạn. Vui lòng thử lại.');
    }

    return () => clearInterval(interval);
  }, [qrCodeUrl, timer]);

  const handlePayment = async () => {
    setLoading(true);
    const paymentData = {
      paymentMethodId: Number(paymentMethod),
      bookingId: Number(bookingData.bookingId),
      selectedBank: paymentMethod === '1' ? selectedBank : null,
    };

    try {
      const paymentResponse = await axiosInstanceToken.post('/api/payments/create', paymentData, {});

      const paymentDetailsId = paymentResponse.data.id;

      if (paymentMethod === '1') {
        const qrCodeRequest = {
          paymentId: Number(paymentDetailsId),
          bankId: Number(selectedBank)
        };

        const qrCodeResponse = await axiosInstanceToken.post('/api/qrcode/create', qrCodeRequest, {});

        const fullQrCodeUrl = `${baseUrl}${qrCodeResponse.data.qrCodeUrl}`;
        setQrCodeUrl(fullQrCodeUrl);
        setTimer(120);
        setShowPaymentForm(false);
        message.success('Thanh toán và tạo mã QR thành công!');
      } else {
        message.success('Thanh toán thành công!');
      }
    } catch (error) {
      message.error('Thanh toán thất bại.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setQrCodeUrl('');
    setShowPaymentForm(true);
    setTimer(120);
  };

  const totalPrice =
    (bookingData.adult_tickets * bookingData.ticketPrice.adult_price +
      bookingData.child_tickets * bookingData.ticketPrice.child_price) *
    bookingData.days;

  return (
    <Box className="payment-container" sx={{ display: 'flex', gap: 2, padding: 2 }}>
      <Paper elevation={3} className="payment-info" sx={{ flex: 2, padding: 2, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Thông tin đặt vé
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1">Ngày đặt: {bookingData.booking_date}</Typography>
        <Typography variant="body1">Người lớn: {bookingData.adult_tickets}</Typography>
        <Typography variant="body1">Trẻ em: {bookingData.child_tickets}</Typography>
        <Typography variant="body1">Số ngày: {bookingData.days}</Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
          Tổng giá vé: {totalPrice.toLocaleString()} VND
        </Typography>
      </Paper>

      <Paper elevation={3} className="order-summary" sx={{ flex: 1, padding: 2, borderRadius: 2 }}>
        {showPaymentForm ? (
          <>
            <Typography variant="h6" gutterBottom>
              Chọn phương thức thanh toán
            </Typography>
            <PaymentForm
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              paymentMethods={paymentMethods}
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
          </>
        ) : (
          <>
            <QRCodeDisplay qrCodeUrl={qrCodeUrl} />
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              QR code hết hạn sau: {timer}s
            </Typography>
            <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ mt: 2 }}>
              Hủy
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default PaymentPage;
