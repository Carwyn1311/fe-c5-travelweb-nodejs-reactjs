import React from 'react';
import { Typography, Box, TextField, Button, Paper } from '@mui/material';
import axiosInstanceToken from '../AxiosInterceptor/Content/axioslnterceptorToken';

interface UserInfoProps {
  userData: any;
}

const UserInfo: React.FC<UserInfoProps> = ({ userData }) => {
  const [userInfo, setUserInfo] = React.useState({
    fullname: userData.fullname,
    email: userData.email,
    phone: userData.phone,
    address: userData.address,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstanceToken.put('/api/update', userInfo );
      console.log('User info updated:', response.data);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 4 }}>
      <Typography variant="h5" gutterBottom>Thông Tin Người Dùng</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Họ Tên"
          name="fullname"
          value={userInfo.fullname}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          disabled
        />
        <TextField
          label="Số Điện Thoại"
          name="phone"
          value={userInfo.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Địa Chỉ"
          name="address"
          value={userInfo.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Cập Nhật Thông Tin
        </Button>
      </form>
    </Paper>
  );
};

export default UserInfo;
