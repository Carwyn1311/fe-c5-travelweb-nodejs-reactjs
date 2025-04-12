import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, Paper, CircularProgress } from '@mui/material';
import axiosInstanceToken from '../AxiosInterceptor/Content/axioslnterceptorToken';
import UserInfo from './UserInfoForm';
import PaymentHistory from './PaymentHistoryForm';
import Wishlist from './Wishlist';

const UserProfile: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'history' | 'wishlist'>('history');
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstanceToken.get('/api/user');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleFormChange = (form: 'history' | 'wishlist') => {
    setActiveForm(form);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ paddingTop: '80px', display: 'flex' }}>
      <Box sx={{ flex: 3, paddingRight: 2 }}>
        <UserInfo userData={userData} />
      </Box>
      <Box sx={{ flex: 7 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
          <Button variant={activeForm === 'history' ? 'contained' : 'outlined'} onClick={() => handleFormChange('history')} sx={{ marginRight: 1 }}>
            Lịch Sử Thanh Toán
          </Button>
          <Button variant={activeForm === 'wishlist' ? 'contained' : 'outlined'} onClick={() => handleFormChange('wishlist')}>
            Danh Sách Yêu Thích
          </Button>
        </Box>
        <Paper elevation={3} sx={{ padding: 2, borderRadius: 4 }}>
          {activeForm === 'history' ? <PaymentHistory paymentDetails={userData.paymentDetails} /> : <Wishlist wishlistList={userData.wishlistList} />}
        </Paper>
      </Box>
    </Container>
  );
};

export default UserProfile;
