// DeleteCity.tsx
import React from 'react';
import { Modal, message } from 'antd';
import { City } from '../../../models/City';
import CityService from '../../../models/CityService';


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
    <Modal
      title="Xác Nhận Xóa Thành Phố"
      visible={true}
      onOk={handleDelete}
      onCancel={onClose}
      okText="Xóa"
      okType="danger"
      cancelText="Huỷ"
    >
      <p>Bạn có chắc chắn muốn xóa thành phố <strong>{city.name}</strong> không?</p>
    </Modal>
  );
};

export default DeleteCity;
