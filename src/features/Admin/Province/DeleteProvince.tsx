// DeleteProvince.tsx
import React from 'react';
import { Modal, message } from 'antd';
import { Province } from '../../../models/Provinces';
import ProvinceService from '../../../service/ProvinceService';


interface DeleteProvinceProps {
  province: Province;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteProvince: React.FC<DeleteProvinceProps> = ({ province, onClose, onSuccess }) => {
  const handleDelete = async () => {
    try {
      await ProvinceService.deleteProvince(province.id);
      message.success('Xóa tỉnh thành công');
      onSuccess();
    } catch (error: any) {
      console.error('Lỗi khi xóa tỉnh:', error);
      message.error('Lỗi khi xóa tỉnh');
    } finally {
      onClose();
    }
  };

  return (
    <Modal
      title="Xác nhận xóa tỉnh"
      visible={true}
      onOk={handleDelete}
      onCancel={onClose}
      okText="Xóa"
      okType="danger"
      cancelText="Huỷ"
    >
      <p>Bạn có chắc chắn muốn xóa tỉnh <strong>{province.name}</strong> không?</p>
    </Modal>
  );
};

export default DeleteProvince;
