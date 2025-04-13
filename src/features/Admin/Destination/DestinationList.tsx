import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message, Image, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import '../css/ListMain.css';

import FormCreateDestination from './FormCreateDestination';
import FormViewDestination from './FormViewDestination';
import {
  deleteDestination,
  fetchDestinations,
  Destination,
} from './listdest';
import FormUpdateDestination from './form/FormUpdateDestination';

const DestinationList: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'update' | 'view' | null>(null);

  const loadDestinations = async () => {
    setLoading(true);
    try {
      const response = await fetchDestinations();  // Gọi hàm fetchDestinations để lấy dữ liệu
      console.log('Fetched destinations:', response.data);  // Kiểm tra dữ liệu trả về từ API

      // Kiểm tra xem API trả về đúng dữ liệu không
      if (response.success && Array.isArray(response.data)) {
        // Cập nhật state destinations với mảng điểm đến từ API
        setDestinations(response.data);
      } else {
        message.error('Dữ liệu không hợp lệ');
      }
    } catch (error) {
      message.error('Không thể tải danh sách điểm đến');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDestinations();  // Gọi hàm để tải điểm đến khi component mount
  }, []);  // Chạy một lần khi component mount

  const handleDeleteDestination = async (destinationId: string) => {
    setLoading(true);
    try {
      await deleteDestination(destinationId);
      // Cập nhật danh sách điểm đến sau khi xóa
      setDestinations(destinations.filter((dest) => dest._id !== destinationId));
      message.success('Xóa điểm đến thành công');
    } catch (error) {
      message.error('Lỗi khi xóa điểm đến');
    }
    setLoading(false);
  };

  const handleCloseForm = () => {
    setFormMode(null);
    setSelectedDestination(null);
  };

  const handleEditDestination = (destination: Destination) => {
    setSelectedDestination(destination);
    setFormMode('update');
  };

  const handleViewDestination = (destination: Destination) => {
    setSelectedDestination(destination);
    setFormMode('view');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      className: 'mainlist-column-id',
    },
    {
      title: 'Tên Điểm Đến',
      dataIndex: 'name',
      key: 'name',
      className: 'mainlist-column-name',
      render: (text: string, record: Destination) => (
        <div className="mainlist-destination-info">
          {record.destination_images && record.destination_images.length > 0 && (
            <Image
              src={record.destination_images[0].image_url}
              alt={text}
              className="mainlist-destination-thumbnail"
              width={50}
              height={50}
              preview={false}
            />
          )}
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Địa Điểm',
      dataIndex: 'location',
      key: 'location',
      className: 'mainlist-column-location',
    },
    {
      title: 'Giá Người Lớn',
      dataIndex: 'adult_price',
      key: 'adult_price',
      className: 'mainlist-column-price',
      render: (price: number | undefined) => (price != null ? `${price.toLocaleString()} VNĐ` : 'N/A'),
    },
    {
      title: 'Giá Trẻ Em',
      dataIndex: 'child_price',
      key: 'child_price',
      className: 'mainlist-column-price',
      render: (price: number | undefined) => (price != null ? `${price.toLocaleString()} VNĐ` : 'N/A'),
    },
    {
      title: 'Thành Phố',
      dataIndex: 'city_id',
      key: 'city_id',
      render: (city: any) => city ? city.name : 'Không có dữ liệu',
    },
    {
      title: 'Tỉnh',
      dataIndex: 'province_id',
      key: 'province_id',
      render: (province: any) => province ? province.name : 'Không có dữ liệu',
    },
    {
      title: 'Số Ngày',
      dataIndex: 'days',
      key: 'days',
    },
    {
      title: 'Thao Tác',
      key: 'actions',
      className: 'mainlist-column-actions',
      render: (text: string, record: Destination) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewDestination(record)}
            className="mainlist-view-btn"
          >
            Xem
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditDestination(record)}
            className="mainlist-edit-btn"
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa điểm đến này?"
            onConfirm={() => handleDeleteDestination(record._id!)}
            okText="Có"
            cancelText="Không"
          >
            <Button icon={<DeleteOutlined />} className="mainlist-delete-btn">
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  

  return (
    <div className="mainlist-container">
      <div className="mainlist-header">
        <h2 className="mainlist-title">Quản Lý Điểm Đến</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setFormMode('create')}
          className="mainlist-add-button"
        >
          Thêm Điểm Đến Mới
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={destinations}
        loading={loading}
        rowKey="_id"
        className="mainlist-table"
        pagination={{ className: 'mainlist-pagination' }}
      />

      {formMode === 'create' && (
        <FormCreateDestination
          onClose={handleCloseForm}
          onSuccess={() => loadDestinations()}  // Cập nhật danh sách điểm đến sau khi thêm mới
        />
      )}

      {formMode === 'view' && selectedDestination && (
        <FormViewDestination destination={selectedDestination} onClose={handleCloseForm} />
      )}

      {formMode === 'update' && selectedDestination && (
        <FormUpdateDestination
          visible={formMode === 'update'}
          onClose={handleCloseForm}
          destination={selectedDestination}
          onSuccess={() => loadDestinations()}  // Cập nhật danh sách điểm đến sau khi sửa
        />
      )}
    </div>
  );
};

export default DestinationList;
