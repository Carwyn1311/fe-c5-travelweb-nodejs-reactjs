// ListUser.tsx
import React from 'react';
import { Table, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { IUser } from './ManagerUser';

interface IListUserProps {
  users: IUser[];
  onViewUser: (user: IUser) => void;
  onDeleteUser: (user: IUser) => void;
  currentUser: any;
}

const ListUser: React.FC<IListUserProps> = ({ users, onViewUser, onDeleteUser, currentUser }) => {
  const columns = [
    {
      title: 'Tên Đăng Nhập',
      dataIndex: 'username',
      key: 'username',
      className: 'mainlist-column-name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      className: 'mainlist-column-email',
    },
    {
      title: 'Vai Trò',
      dataIndex: 'roles',
      key: 'roles',
      className: 'mainlist-column-roles',
      render: (roles: { id: string; name: string }[]) =>
        roles
          .map((role) => <span key={role.id}>{role.name}</span>)
          .reduce((prev, curr) => <>{prev}, {curr}</>),
    },
    {
      title: 'Hành Động',
      key: 'action',
      className: 'mainlist-column-actions',
      render: (text: any, record: IUser) => (
        <span>
          <Button
            icon={<EyeOutlined />}
            onClick={() => onViewUser(record)}
            className="mainlist-view-btn"
          >
            Xem
          </Button>
          {currentUser && currentUser.isAdmin() && (
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDeleteUser(record)}
              style={{ marginLeft: 8 }}
            >
              Xóa
            </Button>
          )}
        </span>
      ),
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={users} 
      rowKey="id" 
      className="mainlist-table" 
    />
  );
};

export default ListUser;
