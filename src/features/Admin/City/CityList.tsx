import React, { useState, useEffect } from 'react';
import { Table, Button, message, Space, Popconfirm, Spin } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import FormCreateCity from './FormCreateCity';
import FormUpdateCity from './FormUpdateCity';
import FormViewCity from './FormViewCity';
import '../css/ListMain.css';
import { listcity } from './listcity';
import { listpovince } from './listpovince';

interface City {
  id: number;
  name: string;
  province: number;
}

interface Province {
  id: number;
  name: string;
}

const CityList: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'update' | 'view' | null>(null);

  // Lấy danh sách địa điểm
  const fetchCities = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/city/list');
      setCities(response.data);
    } catch (error) {
      message.error('Không thể tải danh sách địa điểm');
    } finally {
      setLoading(false);
    }
  };

  // Lấy danh sách tỉnh
  const fetchProvinces = async () => {
    try {
      const response = await axiosInstance.get('/api/province/list');
      setProvinces(response.data);
      listcity.splice(0, listcity.length, ...response.data);
      listpovince.splice(0, listpovince.length, ...response.data);

    } catch (error) {
      message.error('Không thể tải danh sách tỉnh');
    }
  };

  // Reset form và trạng thái
  const handleCloseForm = () => {
    setFormMode(null);
    setSelectedCity(null);
  };

  // Chuẩn bị dữ liệu để chỉnh sửa
  const handleEditCity = (city: City) => {
    setSelectedCity(city);
    setFormMode('update');
  };

  // Chuẩn bị xem chi tiết
  const handleViewCity = (city: City) => {
    setSelectedCity(city);
    setFormMode('view');
  };

  useEffect(() => {
    fetchCities();
    fetchProvinces();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      className: 'mainlist-column-id', // Sử dụng lớp CSS chính mới
    },
    {
      title: 'Tên địa điểm',
      dataIndex: 'name',
      key: 'name',
      className: 'mainlist-column-name', // Sử dụng lớp CSS chính mới
    },
    {
      title: 'Tên Tỉnh',
      dataIndex: 'province',
      key: 'province',
      className: 'mainlist-column-province', // Sử dụng lớp CSS chính mới
      render: (provinceId: number) => {
        const province = provinces.find(province => province.id === provinceId);
        return province ? province.name : '';
      }
    },
    {
      title: 'Thao Tác',
      key: 'actions',
      className: 'mainlist-column-actions', // Sử dụng lớp CSS chính mới
      render: (text: string, record: City) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewCity(record)}
            className="mainlist-view-btn" // Sử dụng lớp CSS chính mới
          >
            Xem
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditCity(record)}
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
        <h2 className="mainlist-title">Quản Lý Địa Điểm</h2> {/* Sử dụng lớp CSS chính mới */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setFormMode('create')}
          className="mainlist-add-button" // Sử dụng lớp CSS chính mới
        >
          Thêm Địa Điểm Mới
        </Button>
      </div>

      {loading ? (
        <div className="mainlist-spin-container">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={cities}
          rowKey="id"
          className="mainlist-table" // Sử dụng lớp CSS chính mới
          pagination={{
            className: 'mainlist-pagination' // Sử dụng lớp CSS chính mới
          }}
        />
      )}

      {formMode === 'create' && (
        <FormCreateCity
          onClose={handleCloseForm}
          onSuccess={fetchCities}
        />
      )}

      {formMode === 'update' && selectedCity && (
        <FormUpdateCity
          city={selectedCity}
          onClose={handleCloseForm}
          onSuccess={fetchCities}
        />
      )}

      {formMode === 'view' && selectedCity && (
        <FormViewCity
          city={selectedCity}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default CityList;
