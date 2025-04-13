// ManagerProvince.tsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Form, Input, Spin, Modal } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import '../css/ListMain.css';
import { Province } from '../../../models/Provinces';
import ProvinceService from '../../../service/ProvinceService';
import AddProvince from './AddProvince';
import EditProvince from './EditProvince';
import ViewProvince from './ViewProvince';
import DeleteProvince from './DeleteProvince';

const ManagerProvince: React.FC = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [mode, setMode] = useState<'view' | 'edit' | 'add' | 'delete' | null>(null);

  const fetchProvinces = async () => {
    setLoading(true);
    try {
      const response = await ProvinceService.getProvinces();
      if (response.success) {
        const provinceData: Province[] = response.data.map((prov: any) => new Province(prov));
        setProvinces(provinceData);
      } else {
        Modal.error({ title: 'Lỗi', content: 'Không thể tải danh sách tỉnh' });
      }
    } catch (error) {
      Modal.error({ title: 'Lỗi', content: 'Không thể tải danh sách tỉnh' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filteredProvinces = provinces.filter(prov =>
    prov.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const openAdd = () => {
    setMode('add');
    setSelectedProvince(null);
  };

  const openView = (province: Province) => {
    setSelectedProvince(province);
    setMode('view');
  };

  const openEdit = (province: Province) => {
    setSelectedProvince(province);
    setMode('edit');
  };

  const openDelete = (province: Province) => {
    setSelectedProvince(province);
    setMode('delete');
  };

  const closeModal = () => {
    setMode(null);
    setSelectedProvince(null);
  };

  const handleOperationSuccess = () => {
    fetchProvinces();
    closeModal();
  };

  const columns = [
    { title: 'Tên Tỉnh', dataIndex: 'name', key: 'name', className: 'mainlist-column-name' },
    { title: 'Quốc Gia', dataIndex: 'country', key: 'country', className: 'mainlist-column-country' },
    {
      title: 'Thao Tác',
      key: 'actions',
      className: 'mainlist-column-actions',
      render: (_: any, record: Province) => (
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
        <h2 className="mainlist-title">Quản Lý Tỉnh</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAdd} className="mainlist-add-button">
          Thêm Tỉnh Mới
        </Button>
      </div>
      <Form layout="inline" className="mainlist-search-form">
        <Form.Item>
          <Input
            placeholder="Tìm kiếm tỉnh..."
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
          columns={columns}
          dataSource={filteredProvinces}
          rowKey="id"
          className="mainlist-table"
          pagination={{ className: 'mainlist-pagination' }}
        />
      )}
      
      {mode === 'add' && (
        <AddProvince visible={true} onClose={closeModal} onSuccess={handleOperationSuccess} />
      )}

      {mode === 'edit' && selectedProvince && (
        <EditProvince visible={true} province={selectedProvince} onClose={closeModal} onSuccess={handleOperationSuccess} />
      )}

      {mode === 'view' && selectedProvince && (
        <ViewProvince visible={true} province={selectedProvince} onClose={closeModal} />
      )}

      {mode === 'delete' && selectedProvince && (
        <DeleteProvince province={selectedProvince} onClose={closeModal} onSuccess={handleOperationSuccess} />
      )}
    </div>
  );
};

export default ManagerProvince;
