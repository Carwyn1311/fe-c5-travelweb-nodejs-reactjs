import React, { useEffect, useState } from 'react';
import { Drawer, Descriptions, message } from 'antd';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import '../css/ListMain.css'; 

interface City {
  id: number;
  name: string;
  province: number;
}

interface Province {
  id: number;
  name: string;
  country: string;
}

interface FormViewCityProps {
  city: City;
  onClose: () => void;
}

const FormViewCity: React.FC<FormViewCityProps> = ({ city, onClose }) => {
  const [provinceName, setProvinceName] = useState<string>('');
  const [countryName, setCountryName] = useState<string>('');

  useEffect(() => {
    // Fetch the list of provinces to get the province name and country
    const fetchProvinces = async () => {
      try {
        const response = await axiosInstance.get('/api/province/list');
        const provinces: Province[] = response.data;
        const province = provinces.find(province => province.id === city.province);
        if (province) {
          setProvinceName(province.name);
          setCountryName(province.country);
        }
      } catch (error) {
        message.error('Lỗi khi tải thông tin tỉnh');
      }
    };

    fetchProvinces();
  }, [city.province]);

  return (
    <Drawer
      title="Chi Tiết Địa Điểm"
      placement="right"
      onClose={onClose}
      open={true}
      className="citylist-view-drawer"
    >
      <Descriptions bordered column={1} className="citylist-view-details">
        <Descriptions.Item label="ID">
          {city.id}
        </Descriptions.Item>
        <Descriptions.Item label="Tên Địa Điểm">
          {city.name}
        </Descriptions.Item>
        <Descriptions.Item label="Tên Tỉnh">
          {provinceName}
        </Descriptions.Item>
        <Descriptions.Item label="Quốc Gia">
          {countryName}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default FormViewCity;
