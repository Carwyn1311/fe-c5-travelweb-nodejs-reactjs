// ViewCity.tsx
import React, { useEffect, useState } from 'react';
import { Drawer, Descriptions, Button } from 'antd';

import '../css/ListMain.css';
import { City } from '../../../models/City';
import CityService from '../../../models/CityService';

interface ViewCityProps {
  visible: boolean;
  onClose: () => void;
  city: City;
}

const ViewCity: React.FC<ViewCityProps> = ({ visible, onClose, city }) => {
  const [provinceName, setProvinceName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    const fetchCityDetails = async () => {
      try {
        const response = await CityService.getCityById(city.id);
        if (response.success) {
          const data = response.data;
          setProvinceName(data.province_id && data.province_id.name ? data.province_id.name : '');
          setDescription(data.description || '');
        }
      } catch (error) {
        // Có thể log lỗi hoặc hiển thị thông báo
      }
    };
    fetchCityDetails();
  }, [city.id]);

  return (
    <Drawer
      title="Chi Tiết Thành Phố"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={360}
      bodyStyle={{ paddingBottom: 80 }}
      className="citylist-view-drawer"
    >
      <Descriptions bordered column={1} className="citylist-view-details">
        <Descriptions.Item label="ID">{city.id}</Descriptions.Item>
        <Descriptions.Item label="Tên">{city.name}</Descriptions.Item>
        <Descriptions.Item label="Tỉnh">{provinceName}</Descriptions.Item>
        <Descriptions.Item label="Mô Tả">{description}</Descriptions.Item>
      </Descriptions>
      <div style={{ textAlign: 'right', marginTop: 16 }}>
        <Button onClick={onClose} type="primary">Đóng</Button>
      </div>
    </Drawer>
  );
};

export default ViewCity;
