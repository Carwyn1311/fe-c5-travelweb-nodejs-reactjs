// ProfileUser.tsx
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, CircularProgress } from '@mui/material';

import UserInfoForm from './UserInfoForm';
import ProfileService from '../../service/ProfileService';
import { User } from '../../models/User';

const ProfileUser: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const currentUser = User.getUserData(); // Lấy thông tin user hiện hành từ local/session storage
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        const response = await ProfileService.getProfileById(currentUser.id);
        if (response.success) {
          setUserData(response.data);
        } else {
          console.error('Không thể lấy thông tin hồ sơ');
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin hồ sơ:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
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
    <Container sx={{ pt: '80px' }}>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        {/* Component hiển thị thông tin profile (UserInfoForm) nhận vào userData */}
        <UserInfoForm userData={userData} />
      </Paper>
    </Container>
  );
};

export default ProfileUser;
