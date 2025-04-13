import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Sidebar.css';
import { User } from '../../../models/User';
import { Menu, Button } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { classifyDestinations, Destination, fetchDestinations } from '../../Admin/Destination/listdest';

interface SidebarProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isLoggedIn, onLogout }) => {
  const [destinationsByProvinceAndCity, setDestinationsByProvinceAndCity] = useState<
    { [provinceName: string]: { [cityName: string]: Destination[] } }
  >({});
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchAndClassifyDestinations = async () => {
      try {
        await fetchDestinations(); // Fetch dữ liệu điểm đến từ API
        const classified = await classifyDestinations(); // Phân loại điểm đến theo tỉnh và thành phố
        setDestinationsByProvinceAndCity(classified);
      } catch (error) {
        console.error('Lỗi khi tải và phân loại điểm đến:', error);
      }
    };

    // Check admin status
    const currentUser = User.getUserData();
    if (currentUser) {
      setIsAdmin(currentUser.isAdmin());
    }

    fetchAndClassifyDestinations();
  }, []);

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Trang chủ',
      onClick: () => handleMenuClick('/'),
    },
    ...(isAdmin
      ? [
          {
            key: 'admin',
            icon: <UserOutlined />,
            label: 'Trang Admin',
            children: [
              {
                key: 'manage-users',
                label: 'Quản lý User',
                onClick: () => handleMenuClick('/admin/manage-users'),
              },
              {
                key: 'paymentdetails',
                label: 'Xác nhận thanh toán',
                onClick: () => handleMenuClick('/admin/paymentdetails'),
              },
              {
                key: 'tour-list',
                label: 'Quản lý DS Tour',
                onClick: () => handleMenuClick('/admin/tour-list'),
              },
              {
                key: 'city-list',
                label: 'Quản lý City',
                onClick: () => handleMenuClick('/admin/city-list'),
              },
              {
                key: 'province-list',
                label: 'Quản lý Provice List',
                onClick: () => handleMenuClick('/admin/province-list'),
              },
            ],
          },
        ]
      : []),
    {
      key: 'destinations',
      icon: <AppstoreOutlined />,
      label: 'Điểm đến',
      children: Object.entries(destinationsByProvinceAndCity).map(([provinceName, cities]) => ({
        key: `province-${provinceName}`,
        label: provinceName,
        children: Object.entries(cities).map(([cityName, destinations]) => ({
          key: `city-${provinceName}-${cityName}`,
          label: cityName,
          children: destinations.map((dest) => ({
            key: `dest-${dest._id}`,
            label: dest.name,
            onClick: () => navigate(`/destination/${dest._id}`),
          })),
        })),
      })),
    },
    {
      key: 'services',
      icon: <SettingOutlined />,
      label: 'Dịch vụ du lịch',
      children: [
        {
          key: 'service-1',
          label: 'Thông tin về PDT Travel',
          onClick: () => handleMenuClick('/info-dpt-travel'),
        },
      ],
    },
    {
      key: 'contact',
      icon: <PhoneOutlined />,
      label: 'Liên hệ',
      onClick: () => handleMenuClick('/contact'),
    },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Menu mode='inline' inlineCollapsed={!isOpen} className='sidebar-menu' items={menuItems} />
      {isLoggedIn && (
        <div className='sidebar-logout'>
          <Button onClick={onLogout} className='sidebar-logout-btn'>
            Đăng xuất
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;