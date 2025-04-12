import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/Sidebar.css";
import { User } from "../../User/Content/User";
import { Menu, Button } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  UserOutlined,
  GlobalOutlined,
  SettingOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { classifyDestinations, Destination, fetchDestinations } from "../../Admin/Destination/listdest";

interface SidebarProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isLoggedIn, onLogout }) => {
  const [domestic, setDomestic] = useState<any[]>([]);
  const [international, setInternational] = useState<any[]>([]);
    const [domesticDestinations, setDomesticDestinations] = useState<{ [key: string]: Destination[] }>({});
    const [internationalDestinations, setInternationalDestinations] = useState<{ [key: string]: Destination[] }>({});
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
      const fetchAndClassifyDestinations = async () => {
        await fetchDestinations(); // Fetch dữ liệu điểm đến từ API
        const { domestic, international } = classifyDestinations() as { domestic: { [key: string]: Destination[] }, international: { [key: string]: Destination[] } }; // Phân loại điểm đến thành trong nước và quốc tế
        setDomesticDestinations(domestic); // Lưu trữ điểm đến trong nước
        setInternationalDestinations(international); // Lưu trữ điểm đến quốc tế
      };
  
      fetchAndClassifyDestinations(); // Thực thi chức năng fetch và phân loại điểm đến
    }, []); 


  useEffect(() => {
    const currentUser = User.getUserData();
    if (currentUser) {
      setIsAdmin(currentUser.isAdmin());
    }

    const fetchAndClassifyDestinations = async () => {
      await fetchDestinations(); 
      const { domestic, international } = classifyDestinations(); 
      setDomestic(Object.values(domestic).flat());
      setInternational(Object.values(international).flat());
    };

    fetchAndClassifyDestinations(); 
  }, []);

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const formatPath = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[\s,]/g, "-");
  };

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Trang chủ",
      onClick: () => handleMenuClick("/"),
    },
    
    {
      key: "admin",
      icon: <UserOutlined />,
      label: "Trang Admin",
      children: [
        {
          key: "manage-users",
          label: "Quản lý User",
          onClick: () => handleMenuClick("/admin/manage-users"),
        },
        {
          key: "paymentdetails",
          label: "Xác nhận thanh toán",
          onClick: () => handleMenuClick("/admin/paymentdetails"),
        },
        {
          key: "tour-list",
          label: "Quản lý DS Tour",
          onClick: () => handleMenuClick("/admin/tour-list"),
        },
        {
          key: "city-list",
          label: "Quản lý City",
          onClick: () => handleMenuClick("/admin/city-list"),
        },
        {
          key: "province-list",
          label: "Quản lý Provice List",
          onClick: () => handleMenuClick("/admin/province-list"),
        },
      ],
    },
    {
          key: "domestic-travel",
          icon: <AppstoreOutlined />,
          label: "Tour Trong Nước",
          children: Object.entries(domesticDestinations).map(
            ([provinceName, destinations]) => ({
              key: `province-${provinceName}`,
              label: provinceName,
              children: destinations.map((dest) => ({
                key: `domestic-${dest.id}`,
                label: dest.name,
                onClick: () => navigate(`/destination/${dest.id}`),  // Sử dụng id làm URL
              })),
            })
          ),
        },
        {
          key: "international-travel",
          icon: <GlobalOutlined />,
          label: "Tour Quốc Tế",
          children: Object.entries(internationalDestinations).map(
            ([provinceName, destinations]) => ({
              key: `province-${provinceName}`,
              label: provinceName,
              children: destinations.map((dest) => ({
                key: `international-${dest.id}`,
                label: dest.name,
                onClick: () => navigate(`/destination/${dest.id}`),  // Sử dụng id làm URL
              })),
            })
          ),
        },
    
    {
      key: "services",
      icon: <SettingOutlined />,
      label: "Dịch vụ du lịch",
      children: [
        {
          key: "service-1",
          label: "Thông tin về PDT Travel",
          onClick: () => handleMenuClick("/info-dpt-travel"),
        },
      ],
    },

    {
      key: "contact",
      icon: <PhoneOutlined />,
      label: "Liên hệ",
      onClick: () => handleMenuClick("/contact"),
    },
  ];
  ///: []),
  //];

  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Menu
        mode="inline"
        inlineCollapsed={!isOpen}
        className="sidebar-menu"
        items={menuItems}
      />
      {isLoggedIn && (
        <div className="sidebar-logout">
          <Button onClick={onLogout} className="sidebar-logout-btn">
            Đăng xuất
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
