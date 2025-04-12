import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '../features/User/Content/User';
import Sidebar from '../features/Sidebar/Content/Sidebar';
import AppHeader from '../features/Header/Content/AppHeader';
import RoutesComponent from './RoutesComponent';

const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'vn'>('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = ['/login', '/create-account', '/forgot-password'].includes(location.pathname);

  useEffect(() => {
    const user = User.getUserData();
    if (user) {
      setIsLoggedIn(true);
      setFullname(user.fullname);
      setRole(user.role.toString());
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const storedRole = localStorage.getItem('role');
      const storedFullname = localStorage.getItem('fullname') || '';
      setRole(storedRole || '');
      setFullname(storedFullname);
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
      const storedRole = localStorage.getItem('role');
      setRole(storedRole || 'USER');
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
          username={username}
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
