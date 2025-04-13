// AddCity.tsx
import React, { useEffect, useState } from 'react';
import { Drawer, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CityService from '../../../service/CityService';
import ProvinceService from '../../../service/ProvinceService';
import { message } from 'antd'; // Bạn có thể chuyển sang sử dụng Snackbar của MUI nếu cần

interface Province {
  id: string;
  name: string;
  country?: string;
}

interface AddCityProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddCity: React.FC<AddCityProps> = ({ open, onClose, onSuccess }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [provinceId, setProvinceId] = useState<string>('');
  const [provinces, setProvinces] = useState<Province[]>([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await ProvinceService.getProvinces();
        if (response.success) {
          const normalizedProvinces: Province[] = response.data.map((prov: any) => ({
            id: prov._id || prov.id,
            name: prov.name,
            country: prov.country,
          }));
          setProvinces(normalizedProvinces);
        } else {
          message.error('Dữ liệu tỉnh không hợp lệ');
        }
      } catch (error) {
        message.error('Lỗi khi tải danh sách tỉnh');
      }
    };
    fetchProvinces();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await CityService.createCity(name, description, provinceId);
      message.success('Tạo thành phố thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi tạo thành phố');
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 360, p: 2 } }}
    >
      <Typography variant="h6" gutterBottom>
        Thêm Thành Phố Mới
      </Typography>
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
            onChange={(e) => setProvinceId(e.target.value as string)}
          >
            {provinces.map((prov) => (
              <MenuItem key={prov.id} value={prov.id}>
                {prov.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" type="submit">
          Tạo Thành Phố
        </Button>
      </Box>
    </Drawer>
  );
};

export default AddCity;
