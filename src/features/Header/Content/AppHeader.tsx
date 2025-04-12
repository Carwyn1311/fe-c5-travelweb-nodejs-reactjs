import React, { useEffect, useState, useMemo } from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineMenu, MdMenuOpen } from "react-icons/md";
import { AppstoreOutlined, GlobalOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../css/AppHeader.css';
import { classifyDestinations, fetchDestinations } from '../../Admin/Destination/listdest';
import { User } from '../../../models/User';

interface Destination {
  id: number;
  name: string;
}

interface AppHeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isLoggedIn: boolean;
  // Mặc dù prop username được truyền xuống nhưng chúng ta sẽ cập nhật lại giá trị dựa trên User.getUserData()
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

  // Sử dụng state nội bộ cho username để cập nhật sau khi login thành công
  const [localUsername, setLocalUsername] = useState(username);

  // Khi component mount hoặc prop username thay đổi, cập nhật lại localUsername từ User.getUserData()
  useEffect(() => {
    const user = User.getUserData();
    if (user && user.username) {
      setLocalUsername(user.username);
    }
  }, [username]);

  const [domesticDestinations, setDomesticDestinations] = useState<{ [key: string]: Destination[] }>({});
  const [internationalDestinations, setInternationalDestinations] = useState<{ [key: string]: Destination[] }>({});

  useEffect(() => {
    const fetchAndClassifyDestinations = async () => {
      try {
        await fetchDestinations(); // Lấy dữ liệu điểm đến từ API
        const { domestic, international } = classifyDestinations(); // Phân loại điểm đến
        setDomesticDestinations(domestic);
        setInternationalDestinations(international);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchAndClassifyDestinations();
  }, []);

  const menuItems = useMemo(() => [
    {
      key: "domestic-travel",
      icon: <AppstoreOutlined />,
      label: "Tour Trong Nước",
      children: Object.entries(domesticDestinations).map(([provinceName, destinations]) => ({
        key: `province-${provinceName}`,
        label: provinceName,
        children: destinations.map((dest) => ({
          key: `domestic-${dest.id}`,
          label: dest.name,
          onClick: () => navigate(`/destination/${dest.id}`),
        })),
      })),
    },
    {
      key: "international-travel",
      icon: <GlobalOutlined />,
      label: "Tour Quốc Tế",
      children: Object.entries(internationalDestinations).map(([provinceName, destinations]) => ({
        key: `province-${provinceName}`,
        label: provinceName,
        children: destinations.map((dest) => ({
          key: `international-${dest.id}`,
          label: dest.name,
          onClick: () => navigate(`/destination/${dest.id}`),
        })),
      })),
    },
    {
      key: "services",
      label: "Thông tin về DPT Travel",
      onClick: () => navigate('/info-dpt-travel'),
    },
    {
      key: "contact",
      label: "Liên Hệ",
      onClick: () => navigate('/lien-he'),
    },
  ], [domesticDestinations, internationalDestinations, navigate]);

  const adminMenuItems = useMemo(() => [
    {
      key: "admin",
      icon: <UserOutlined />,
      label: "Trang Admin",
      children: [
        {
          key: "manage-users",
          label: "Quản lý User",
          onClick: () => navigate("/manager/users"),
        },
        {
          key: "paymentdetails",
          label: "Xác nhận thanh toán",
          onClick: () => navigate("/admin/paymentdetails"),
        },
        {
          key: "tour-list",
          label: "Quản lý DS Tour",
          onClick: () => navigate("/admin/tour-list"),
        },
        {
          key: "city-list",
          label: "Quản lý City",
          onClick: () => navigate("/admin/city-list"),
        },
        {
          key: "province-list",
          label: "Quản lý Province List",
          onClick: () => navigate("/admin/province-list"),
        },
      ],
    },
  ], [navigate]);

  const loginMenuItems = useMemo(() => [
    {
      key: "profile",
      label: "Thông tin cá nhân",
      onClick: () => navigate("/profile"),
    },
    {
      key: "switch-account",
      label: "Đăng nhập bằng tài khoản khác",
      onClick: () => navigate("/login"),
    },
    {
      key: "logout",
      label: "Đăng xuất",
      onClick: onLogout,
    },
  ], [navigate, onLogout]);

  return (
    <header className="app-header">
      <div className="top-bar">
        <div className="contact-info">
          {/* Hiển thị nút Sidebar nếu người dùng có role ADMIN */}
          {role === "ADMIN" && (
            <Button
              onClick={toggleSidebar}
              className="sidebar-toggle-button"
              style={{ color: "darkgray", fontSize: "20px" }}
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
          {/* Hiển thị menu Admin nếu role là ADMIN */}
          {role === "ADMIN" && (
            <Dropdown overlay={<Menu items={adminMenuItems} />} trigger={['click']}>
              <Button className="nav-button">Admin</Button>
            </Dropdown>
          )}
          {isLoggedIn ? (
            <Dropdown overlay={<Menu items={loginMenuItems} />} trigger={['click']}>
              <Button className="nav-button">
                <FaUserCircle /> {localUsername || "Guest"}
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
