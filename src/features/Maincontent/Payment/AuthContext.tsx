// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { User } from '../../../models/User';
import UserService from '../../../service/UserService.';
import { axiosToken } from '../../AxiosInterceptor/Content/axiosToken';
// Điều chỉnh đường dẫn theo dự án

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Khi component mount, nếu có token và userId lưu trong localStorage thì tải lại user qua API
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if (!token || !userId) return;
      // Gắn token vào header của axiosToken
      axiosToken.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const response = await UserService.getUserById(userId);
        if (response.success) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const login = (loggedInUser: User) => {
    setUser(loggedInUser);
    if (loggedInUser.token) {
      // Gắn token từ user model vào header của axiosToken
      axiosToken.defaults.headers.common['Authorization'] = `Bearer ${loggedInUser.token}`;
      // Lưu token và userId vào localStorage để duy trì đăng nhập sau khi reload trang
      localStorage.setItem('token', loggedInUser.token);
      localStorage.setItem('userId', loggedInUser.id);
    }
  };

  const logout = () => {
    setUser(null);
    // Xóa token khỏi header và localStorage
    delete axiosToken.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
