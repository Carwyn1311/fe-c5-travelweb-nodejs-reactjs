// ManagerCity.tsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Input, Form, Spin, Modal, message } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import AddCity from './AddCity';
import EditCity from './EditCity';
import ViewCity from './ViewCity';

import '../css/ListMain.css';
import { City } from '../../../models/City';
import CityService from '../../../models/CityService';
import DeleteCity from './DeleteCity';

const ManagerCity: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [mode, setMode] = useState<'add' | 'edit' | 'view' | 'delete' | null>(null);

  const fetchCities = async () => {
    setLoading(true);
    try {
      const response = await CityService.getCities();
      if (response.success) {
        const citiesData: City[] = response.data.map((c: any) => new City(c));
        setCities(citiesData);
      } else {
        message.error('Dữ liệu thành phố không hợp lệ');
      }
    } catch (error: any) {
      message.error('Lỗi khi tải danh sách thành phố');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const openAdd = () => {
    setMode('add');
    setSelectedCity(null);
  };

  const openView = (city: City) => {
    setSelectedCity(city);
    setMode('view');
  };

  const openEdit = (city: City) => {
    setSelectedCity(city);
    setMode('edit');
  };

  const openDelete = (city: City) => {
    setSelectedCity(city);
    setMode('delete');
  };

  const closeModal = () => {
    setMode(null);
    setSelectedCity(null);
  };

  const handleOperationSuccess = () => {
    fetchCities();
    closeModal();
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', className: 'mainlist-column-id' },
    { title: 'Tên Thành Phố', dataIndex: 'name', key: 'name', className: 'mainlist-column-name' },
    {
      title: 'Tỉnh',
      dataIndex: 'provinceId',
      key: 'provinceId',
      className: 'mainlist-column-province',
      render: (provinceId: string) => provinceId // Nếu muốn hiển thị tên tỉnh, có thể bổ sung thêm xử lý
    },
    {
      title: 'Thao Tác',
      key: 'actions',
      className: 'mainlist-column-actions',
      render: (_: any, record: City) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => openView(record)}>Xem</Button>
          <Button icon={<EditOutlined />} onClick={() => openEdit(record)}>Sửa</Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => openDelete(record)}>Xóa</Button>
        </Space>
      )
    }
  ];

  return (
    <div className="mainlist-container">
      <div className="mainlist-header">
        <h2 className="mainlist-title">Quản Lý Thành Phố</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAdd} className="mainlist-add-button">
          Thêm Thành Phố Mới
        </Button>
      </div>
      <Form layout="inline" className="mainlist-search-form">
        <Form.Item>
          <Input
            placeholder="Tìm kiếm thành phố..."
            value={searchValue}
            onChange={handleSearchChange}
            prefix={<SearchOutlined />}
            allowClear
            className="mainlist-search-input"
          />
        </Form.Item>
      </Form>
      {loading ? (
        <div className="mainlist-spin-container">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={filteredCities}
          columns={columns}
          rowKey="id"
          className="mainlist-table"
          pagination={{ className: 'mainlist-pagination' }}
        />
      )}
      
      {mode === 'add' && (
        <AddCity visible={true} onClose={closeModal} onSuccess={handleOperationSuccess} />
      )}
      
      {mode === 'edit' && selectedCity && (
        <EditCity visible={true} city={selectedCity} onClose={closeModal} onSuccess={handleOperationSuccess} />
      )}
      
      {mode === 'view' && selectedCity && (
        <ViewCity visible={true} city={selectedCity} onClose={closeModal} />
      )}
      
      {mode === 'delete' && selectedCity && (
        <DeleteCity city={selectedCity} onClose={closeModal} onSuccess={handleOperationSuccess} />
      )}
    </div>
  );
};

export default ManagerCity;
