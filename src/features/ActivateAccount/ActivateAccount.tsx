import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AxiosInterceptor/Content/axiosInterceptor';
import './ActivateAccount.css'; // Import CSS cho trang

const ActivateAccount: React.FC = () => {
  const [username, setUsername] = useState<string>(''); // Username của người dùng
  const [activationCode, setActivationCode] = useState<string>(''); // Mã kích hoạt từ email
  const [message, setMessage] = useState<string>(''); // Thông báo thành công
  const [error, setError] = useState<string>(''); // Thông báo lỗi
  const [isLoading, setIsLoading] = useState<boolean>(false); // Trạng thái xử lý
  const navigate = useNavigate();

  // Gửi lại mã kích hoạt
  const handleResendActivationCode = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/auth/generate-new-code', { email: username });
      if (response.status === 200) {
        setMessage('Mã kích hoạt đã được gửi lại qua email của bạn.');
        setError('');
      } else {
        setError('Không thể gửi lại mã kích hoạt.');
        setMessage('');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Không thể gửi lại mã kích hoạt.');
      setMessage('');
    }
    setIsLoading(false);
  };

  // Kích hoạt tài khoản với mã kích hoạt
  const handleActivateAccount = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/auth/activate', {
        username,          // Username thay vì email
        activationCode,    // Mã kích hoạt từ người dùng
      });

      if (response.status === 200) {
        setMessage('Tài khoản đã được kích hoạt thành công.');
        setError('');
        setTimeout(() => {
          navigate('/login'); // Điều hướng về trang đăng nhập
        }, 2000); // Đợi 2 giây để người dùng đọc thông báo
      } else {
        setError('Kích hoạt tài khoản không thành công. Vui lòng kiểm tra lại mã.');
        setMessage('');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Kích hoạt tài khoản không thành công.');
      setMessage('');
    }
    setIsLoading(false);
  };

  // Điều hướng quay lại trang đăng nhập
  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container">
      <h2 className="header">Kích hoạt tài khoản</h2>
      <input
        type="text"
        placeholder="Nhập tên đăng nhập của bạn"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Nhập mã kích hoạt"
        value={activationCode}
        onChange={(e) => setActivationCode(e.target.value)}
        className="input"
      />
      <div className="button-container">
        <button onClick={handleActivateAccount} className="button-primary" disabled={isLoading}>
          {isLoading ? 'Đang xử lý...' : 'Kích hoạt tài khoản'}
        </button>
        <button onClick={handleResendActivationCode} className="button-secondary" disabled={isLoading}>
          {isLoading ? 'Đang xử lý...' : 'Gửi lại mã kích hoạt'}
        </button>
      </div>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleBackToLogin} className="button-back">
        Quay lại trang đăng nhập
      </button>
    </div>
  );
};

export default ActivateAccount;
