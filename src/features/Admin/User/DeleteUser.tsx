// DeleteUser.tsx
import React from 'react';
import { Modal, Button, Typography } from 'antd';
import { IUser } from './ManagerUser';

interface IDeleteUserProps {
  visible: boolean;
  user: IUser;
  onClose: () => void;
  onDelete: () => Promise<void>;
}

const { Text } = Typography;

const DeleteUser: React.FC<IDeleteUserProps> = ({ visible, user, onClose, onDelete }) => {
  return (
    <Modal
      title="Xác Nhận Xóa Người Dùng"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Huỷ
        </Button>,
        <Button key="confirm" type="primary" danger onClick={onDelete}>
          Xóa
        </Button>
      ]}
    >
      <Text> Bạn có chắc chắn muốn xóa người dùng <b>{user.username}</b> không?</Text>
    </Modal>
  );
};

export default DeleteUser;
