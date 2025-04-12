import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '../models/User';
import Sidebar from '../features/Sidebar/Content/Sidebar';
import AppHeader from '../features/Header/Content/AppHeader';
import RoutesComponent from './RoutesComponent';

const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'vn'>('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullname, setFullname] = useState('');
  // role state dùng kiểu string: "ADMIN", "CSKH", "USER"
  const [role, setRole] = useState('');
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = ['/login', '/create-account', '/forgot-password'].includes(location.pathname);

  // Khi khởi tạo, lấy thông tin user từ store
  useEffect(() => {
    const user = User.getUserData();
    if (user) {
      setIsLoggedIn(true);
      setFullname(user.fullname);
      // Xác định role dựa trên các phương thức trong model User (với mảng Role)
      if (user.isAdmin()) {
        setRole("ADMIN");
      } else if (user.isCSKH()) {
        setRole("CSKH");
      } else {
        setRole("USER");
      }
    }
  }, []);

  // Nếu cần lấy thông tin lưu trong localStorage (nếu có quá trình đăng nhập trước đó)
  useEffect(() => {
    if (isLoggedIn) {
      const storedRole = localStorage.getItem('role');
      const storedFullname = localStorage.getItem('fullname') || '';
      setFullname(storedFullname);
      // Ưu tiên role từ store User, nếu có thì dùng; nếu không, dùng dữ liệu từ localStorage
      setRole(storedRole ? storedRole : role);
    }
  }, [isLoggedIn]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vn' : 'en');
  };

  const onLogin = () => {
    const user = User.getUserData();
    if (user) {
      setIsLoggedIn(true);
      setFullname(user.fullname);
      // Set role dựa trên kiểm tra quyền của user
      if (user.isAdmin()) {
        setRole("ADMIN");
      } else if (user.isCSKH()) {
        setRole("CSKH");
      } else {
        setRole("USER");
      }
      // Lưu thông tin cần thiết vào localStorage nếu cần
      localStorage.setItem('role', role);
      localStorage.setItem('fullname', user.fullname);
      navigate('/');
    }
  };

  const onLogout = () => {
    User.clearUserData();
    setIsLoggedIn(false);
    setRole('');
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    localStorage.removeItem('fullname');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''} ${isLoginPage ? 'login-page' : ''}`}>
      {!isLoginPage && (
        <>
          <AppHeader
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            isLoggedIn={isLoggedIn}
            username={''}  // Nếu cần, bạn có thể lấy username từ User.getUserData() và set state username
            selectedItem={selectedItem}
            toggleLanguage={toggleLanguage}
            language={language}
            formatPath={(path: string) => path}
            onLogout={onLogout}
            role={role}
          />
          {role === "ADMIN" && (
            <Sidebar
              isOpen={isSidebarOpen}
              isLoggedIn={isLoggedIn}
              onLogout={onLogout}
            />
          )}
        </>
      )}
      <div className="content-wrapper">
        <RoutesComponent onLogin={onLogin} />
      </div>
    </div>
  );
};

export default AppContent;
