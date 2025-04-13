// DeleteCity.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import CityService from '../../../service/CityService';
import { City } from '../../../models/City';
import { message } from 'antd';

interface DeleteCityProps {
  city: City;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteCity: React.FC<DeleteCityProps> = ({ city, onClose, onSuccess }) => {
  const handleDelete = async () => {
    try {
      await CityService.deleteCity(city.id);
      message.success('Xóa thành phố thành công');
      onSuccess();
    } catch (error) {
      message.error('Lỗi khi xóa thành phố');
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Xác Nhận Xóa Thành Phố</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn muốn xóa thành phố <strong>{city.name}</strong> không?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button onClick={handleDelete} color="error" variant="contained">Xóa</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCity;
