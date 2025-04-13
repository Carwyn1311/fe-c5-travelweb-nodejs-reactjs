// ViewCity.tsx
import React, { useEffect, useState } from 'react';
import { Drawer, Box, Typography, Divider, Button } from '@mui/material';
import CityService from '../../../service/CityService';
import { City } from '../../../models/City';

interface ViewCityProps {
  open: boolean;
  onClose: () => void;
  city: City;
}

const ViewCity: React.FC<ViewCityProps> = ({ open, onClose, city }) => {
  const [provinceName, setProvinceName] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [description, setDescription] = useState<string>(city.description);

  useEffect(() => {
    const fetchCityDetails = async () => {
      try {
        const response = await CityService.getCityById(city.id);
        if (response.success) {
          const data = response.data;
          if (data.province_id && typeof data.province_id === 'object') {
            setProvinceName(data.province_id.name || '');
            setCountry(data.province_id.country || '');
          }
          setDescription(data.description || '');
        }
      } catch (error) {
        // Xử lý lỗi nếu cần
      }
    };
    fetchCityDetails();
  }, [city.id]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 360, p: 2 } }}
    >
      <Typography variant="h6" gutterBottom>
        Chi Tiết Thành Phố
      </Typography>
      <Divider />
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2">ID:</Typography>
        <Typography variant="body1">{city.id}</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2">Tên:</Typography>
        <Typography variant="body1">{city.name}</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2">Tỉnh:</Typography>
        <Typography variant="body1">{provinceName}</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2">Quốc Gia:</Typography>
        <Typography variant="body1">{country}</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2">Mô Tả:</Typography>
        <Typography variant="body1">{description}</Typography>
      </Box>
      <Box sx={{ mt: 4, textAlign: 'right' }}>
        <Button variant="contained" onClick={onClose}>Đóng</Button>
      </Box>
    </Drawer>
  );
};

export default ViewCity;
