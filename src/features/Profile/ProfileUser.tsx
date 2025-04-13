import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress
} from '@mui/material';
import moment from 'moment';

import PaymentDetailService from '../../service/PaymentDetailService';
import ProfileService from '../../service/ProfileService';
import { User } from '../../models/User';

const ProfileUser: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const currentUser = User.getUserData();

  useEffect(() => {
    const fetchProfileAndPayments = async () => {
      try {
        if (!currentUser) return;
        const [profileRes, paymentRes] = await Promise.all([
          ProfileService.getProfileById(currentUser.id),
          PaymentDetailService.getPaymentDetailsByUser(currentUser.id)
        ]);

        if (profileRes.success) setUserData(profileRes.data);
        if (paymentRes.success) setPaymentDetails(paymentRes.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng hoặc thanh toán:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndPayments();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!userData) {
    return (
      <Typography variant="h6" color="error" align="center">
        Không tìm thấy thông tin người dùng
      </Typography>
    );
  }

  return (
    <Container sx={{ pt: '80px', display: 'flex', gap: 3 }}>
      {/* Thông tin người dùng */}
      <Box sx={{ flex: 3 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Thông Tin Người Dùng
          </Typography>
          <Typography variant="subtitle1"><strong>Họ Tên:</strong> {userData.fullname}</Typography>
          <Typography variant="subtitle1"><strong>Email:</strong> {userData.email}</Typography>
          <Typography variant="subtitle1"><strong>Số điện thoại:</strong> {userData.phone || 'Chưa cập nhật'}</Typography>
        </Paper>
      </Box>

      {/* Lịch sử thanh toán */}
      <Box sx={{ flex: 7 }}>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold" align="center">
            Lịch Sử Thanh Toán
          </Typography>

          {paymentDetails.length === 0 ? (
            <Typography variant="body1" align="center" sx={{ mt: 2 }}>Không có lịch sử thanh toán</Typography>
          ) : (
            paymentDetails.map((item: any, index: number) => (
              <Paper key={index} sx={{ p: 2, mb: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                <Typography><strong>Ngày:</strong> {moment(item.payment_date).format('DD/MM/YYYY')} - <strong>Số tiền:</strong> {item.amount.toLocaleString('vi-VN')} VND</Typography>
                <Typography><strong>Trạng thái:</strong> {item.status?.toUpperCase() || 'Không xác định'}</Typography>
              </Paper>
            ))
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfileUser;
