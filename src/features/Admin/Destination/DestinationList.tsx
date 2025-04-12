import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Space, message, Popconfirm, Image } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import '../css/ListMain.css'; 

import FormCreateDestination from './FormCreateDestination';
import FormViewDestination from './FormViewDestination';
import {
  classifyDestinations,
  deleteDestination,
  destinationList,
  fetchDestinations,
  Destination,
  Itinerary,
} from './listdest';
import FormUpdateDestination from './form/FormUpdateDestination';

const DestinationList: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'update' | 'view' | null>(null);

  useEffect(() => {
    const loadDestinations = async () => {
      setLoading(true);
      await fetchDestinations();
      setDestinations([...destinationList]);
      setLoading(false);
    };
    loadDestinations();
  }, []);

  const handleDeleteDestination = async (destinationId: number) => {
    setLoading(true);
    await deleteDestination(destinationId);
    setDestinations([...destinationList]);
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

  const renderItineraries = (itineraries: Itinerary[]) => {
    return itineraries.map((itinerary) => (
      <div key={itinerary.id} style={{ marginBottom: '8px' }}>
        <strong>Lịch trình #{itinerary.id}</strong>
        <p>
          Bắt đầu: {moment(itinerary.start_date).format('DD-MM-YYYY HH:mm')} <br />
          Kết thúc: {moment(itinerary.end_date).format('DD-MM-YYYY HH:mm')}
        </p>
        <ul>
          {itinerary.activities.map((activity: { id: React.Key | null | undefined; activity_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; start_time: moment.MomentInput; end_time: moment.MomentInput; }) => (
            <li key={activity.id}>
              {activity.activity_name} ({moment(activity.start_time).format('HH:mm')} - {moment(activity.end_time).format('HH:mm')})
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      className: 'mainlist-column-id', // Sử dụng lớp CSS chính mới
    },
    {
      title: 'Tên Điểm Đến',
      dataIndex: 'name',
      key: 'name',
      className: 'mainlist-column-name', // Sử dụng lớp CSS chính mới
      render: (text: string, record: Destination) => (
        <div className="mainlist-destination-info"> {/* Sử dụng lớp CSS chính mới */}
          {record.destinationImages.length > 0 && (
            <Image
              src={`${process.env.REACT_APP_BASE_URL}${record.destinationImages[0].image_url}`}
              alt={text}
              className="mainlist-destination-thumbnail" // Sử dụng lớp CSS chính mới
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
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      className: 'mainlist-column-type', // Sử dụng lớp CSS chính mới
      render: (type: string) => (
        <Tag color={type === 'DOMESTIC' ? 'blue' : 'green'}>
          {type === 'DOMESTIC' ? 'Trong Nước' : 'Quốc Tế'}
        </Tag>
      ),
    },
    {
      title: 'Địa Điểm',
      dataIndex: 'location',
      key: 'location',
      className: 'mainlist-column-location', // Sử dụng lớp CSS chính mới
    },
    {
      title: 'Thao Tác',
      key: 'actions',
      className: 'mainlist-column-actions', // Sử dụng lớp CSS chính mới
      render: (text: string, record: Destination) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewDestination(record)}
            className="mainlist-view-btn" // Sử dụng lớp CSS chính mới
          >
            Xem
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditDestination(record)}
            className="mainlist-edit-btn" // Sử dụng lớp CSS chính mới
          >
            Sửa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="mainlist-container"> {/* Sử dụng lớp CSS chính mới */}
      <div className="mainlist-header"> {/* Sử dụng lớp CSS chính mới */}
        <h2 className="mainlist-title">Quản Lý Điểm Đến</h2> {/* Sử dụng lớp CSS chính mới */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setFormMode('create')}
          className="mainlist-add-button" // Sử dụng lớp CSS chính mới
        >
          Thêm Điểm Đến Mới
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={destinations}
        loading={loading}
        rowKey="id"
        className="mainlist-table" // Sử dụng lớp CSS chính mới
        pagination={{ className: 'mainlist-pagination' }} // Sử dụng lớp CSS chính mới
      />

      {formMode === 'create' && (
        <FormCreateDestination onClose={handleCloseForm} onSuccess={() => setDestinations([...destinationList])} />
      )}

      {formMode === 'view' && selectedDestination && (
        <FormViewDestination destination={selectedDestination} onClose={handleCloseForm} />
      )}

      {formMode === 'update' && selectedDestination && (
        <FormUpdateDestination
          visible={formMode === 'update'}
          onClose={handleCloseForm}
          destination={selectedDestination}
          onSuccess={() => setDestinations([...destinationList])}
        />
      )}
    </div>
  );
};

export default DestinationList;
