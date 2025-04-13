// EditCity.tsx
import React, { useEffect, useState } from 'react';
import { Drawer, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CityService from '../../../service/CityService';
import { message } from 'antd';
import { City } from '../../../models/City';

interface Province {
  id: string;
  name: string;
  country?: string;
}

interface EditCityProps {
  open: boolean;
  city: City;
  onClose: () => void;
  onSuccess: () => void;
}

const EditCity: React.FC<EditCityProps> = ({ open, city, onClose, onSuccess }) => {
  const [name, setName] = useState<string>(city.name);
  const [description, setDescription] = useState<string>(city.description);
  const [provinceId, setProvinceId] = useState<string>(city.provinceId);
  const [provinces, setProvinces] = useState<Province[]>([]);

  useEffect(() => {
    setName(city.name);
    setDescription(city.description);
    setProvinceId(city.provinceId);
    const fetchProvinces = async () => {
      try {
        const res = await fetch('/provinces').then(res => res.json());
        setProvinces(res);
      } catch (error) {
        message.error('Lỗi khi tải danh sách tỉnh');
      }
    };
    fetchProvinces();
  }, [city]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await CityService.updateCity(city.id, {
        name,
        description,
        province_id: provinceId,
      });
      message.success('Cập nhật thành phố thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi cập nhật thành phố');
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 360, p: 2 } }}
    >
      <Typography variant="h6" gutterBottom>Cập Nhật Thành Phố</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Tên Thành Phố"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Mô Tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth required>
          <InputLabel>Tỉnh</InputLabel>
          <Select
            value={provinceId}
            label="Tỉnh"
            onChange={(e) => setProvinceId(e.target.value)}
          >
            {provinces.map((prov) => (
              <MenuItem key={prov.id} value={prov.id}>
                {prov.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" type="submit">Cập Nhật Thành Phố</Button>
      </Box>
    </Drawer>
  );
};

export default EditCity;
