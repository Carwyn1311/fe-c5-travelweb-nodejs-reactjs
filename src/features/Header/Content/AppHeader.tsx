// src/components/AppHeader.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineMenu, MdMenuOpen } from 'react-icons/md';
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../css/AppHeader.css';
import { User } from '../../../models/User';
import { classifyDestinations, fetchDestinations } from '../../Admin/Destination/listdest';

interface AppHeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isLoggedIn: boolean;
  username: string;
  selectedItem: string;
  toggleLanguage: () => void;
  language: 'en' | 'vn';
  formatPath: (path: string) => string;
  onLogout: () => void;
  role: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  isSidebarOpen,
  toggleSidebar,
  isLoggedIn,
  username,
  selectedItem,
  toggleLanguage,
  language,
  formatPath,
  onLogout,
  role,
}) => {
  const navigate = useNavigate();

  // Cập nhật username từ local user data
  const [localUsername, setLocalUsername] = useState(username);
  useEffect(() => {
    const user = User.getUserData();
    if (user && user.username) {
      setLocalUsername(user.username);
    }
  }, [username]);

  // State để chứa kết quả phân loại điểm đến theo tỉnh → thành phố → destination
  const [domesticDestinations, setDomesticDestinations] = useState<{
    [provinceName: string]: {
      province: { id: string; name: string };
      cities: {
        [cityName: string]: {
          city: { id: string; name: string };
          destinations: { id: string; name: string; encodedPath?: string }[];
        };
      };
    };
  }>({});

  // Gọi hàm fetchDestinations và classifyDestinations để cập nhật danh sách điểm đến
  useEffect(() => {
    const fetchAndClassifyDestinations = async () => {
      try {
        // Lấy dữ liệu điểm đến từ API và format lại (encodedPath dạng travel/tỉnh/city/dest)
        await fetchDestinations();
        // Phân loại theo tỉnh và thành phố dựa trên destinationList toàn cục
        const classified = await classifyDestinations();
        // Chuyển đổi dữ liệu đã phân loại sang cấu trúc dành cho menu
        const transformed = Object.entries(classified).reduce((acc, [provinceName, citiesObj]) => {
          acc[provinceName] = {
            province: { id: provinceName, name: provinceName },
            cities: Object.entries(citiesObj).reduce((cityAcc, [cityName, destinations]) => {
              cityAcc[cityName] = {
                city: { id: cityName, name: cityName },
                // Bao gồm encodedPath trong mỗi destination để điều hướng trực tiếp
                destinations: destinations.map((dest: any) => ({
                  id: dest.id,
                  name: dest.name,
                  encodedPath: dest.encodedPath,
                })),
              };
              return cityAcc;
            }, {} as {
              [cityName: string]: {
                city: { id: string; name: string };
                destinations: { id: string; name: string; encodedPath?: string }[];
              };
            }),
          };
          return acc;
        }, {} as {
          [provinceName: string]: {
            province: { id: string; name: string };
            cities: {
              [cityName: string]: {
                city: { id: string; name: string };
                destinations: { id: string; name: string; encodedPath?: string }[];
              };
            };
          };
        });
        setDomesticDestinations(transformed);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    fetchAndClassifyDestinations();
  }, []);

  // Xây dựng menu danh mục từ dữ liệu phân loại
  const menuItems = useMemo(
    () => [
      {
        key: 'domestic-travel',
        icon: <AppstoreOutlined />,
        label: 'Tour Trong Nước',
        children: Object.entries(domesticDestinations).map(([provinceName, provinceData]) => ({
          key: `province-${provinceName}`,
          label: provinceData.province.name || 'Unknown Province',
          children: Object.entries(provinceData.cities).map(([cityName, cityData]) => ({
            key: `city-${cityName}`,
            label: cityData.city.name || 'Unknown City',
            children: cityData.destinations.map((dest) => ({
              key: `dest-${dest.id}`,
              label: dest.name,
              onClick: () =>
                navigate(`/destination/${dest.id}`, { state: { destinationId: dest.id } }),
            })),
          })),
        })),
      },
      
      {
        key: 'services',
        label: 'Thông tin về DPT Travel',
        onClick: () => navigate('/info-dpt-travel'),
      },
      {
        key: 'contact',
        label: 'Liên Hệ',
        onClick: () => navigate('/lien-he'),
      },
    ],
    [domesticDestinations, navigate, formatPath]
  );

  // Menu admin
  const adminMenuItems = useMemo(
    () => [
      {
        key: 'admin',
        icon: <UserOutlined />,
        label: 'Trang Admin',
        children: [
          {
            key: 'manage-users',
            label: 'Quản lý User',
            onClick: () => navigate('/manager/users'),
          },
          {
            key: 'paymentdetails',
            label: 'Xác nhận thanh toán',
            onClick: () => navigate('/admin/paymentdetails'),
          },
          {
            key: 'tour-list',
            label: 'Quản lý DS Tour',
            onClick: () => navigate('/admin/tour-list'),
          },
          {
            key: 'city-list',
            label: 'Quản lý City',
            onClick: () => navigate('/manager/city-list'),
          },
          {
            key: 'province-list',
            label: 'Quản lý Province List',
            onClick: () => navigate('/manager/province-list'),
          },
        ],
      },
    ],
    [navigate]
  );

  // Menu đăng nhập
  const loginMenuItems = useMemo(
    () => [
      {
        key: 'profile',
        label: 'Thông tin cá nhân',
        onClick: () => navigate('/profile'),
      },
      {
        key: 'switch-account',
        label: 'Đăng nhập bằng tài khoản khác',
        onClick: () => navigate('/login'),
      },
      {
        key: 'logout',
        label: 'Đăng xuất',
        onClick: onLogout,
      },
    ],
    [navigate, onLogout]
  );

  return (
    <header className="app-header">
      <div className="top-bar">
        <div className="contact-info">
          {/* Hiển thị nút Sidebar cho admin */}
          {role === 'ADMIN' && (
            <Button
              onClick={toggleSidebar}
              className="sidebar-toggle-button"
              style={{ color: 'darkgray', fontSize: '20px' }}
            >
              {isSidebarOpen ? <MdMenuOpen /> : <MdOutlineMenu />}
            </Button>
          )}
          <Button onClick={() => navigate('/')} className="nav-button">
            Trang Chủ
          </Button>
          <Dropdown overlay={<Menu items={menuItems} />} trigger={['click']}>
            <Button className="nav-button">Danh Mục</Button>
          </Dropdown>
        </div>
        <div className="user-options">
          {/* Menu admin */}
          {(role === 'ADMIN' || role === 'CSKH') && (
            <Dropdown overlay={<Menu items={adminMenuItems} />} trigger={['click']}>
              <Button className="nav-button">Admin</Button>
            </Dropdown>
          )}
          {/* Menu đăng nhập */}
          {isLoggedIn ? (
            <Dropdown overlay={<Menu items={loginMenuItems} />} trigger={['click']}>
              <Button className="nav-button">
                <FaUserCircle /> {localUsername || 'Guest'}
              </Button>
            </Dropdown>
          ) : (
            <Button className="button-login nav-button" onClick={() => navigate('/login')}>
              <FaUserCircle /> {language === 'en' ? 'Login' : 'Đăng nhập'}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
