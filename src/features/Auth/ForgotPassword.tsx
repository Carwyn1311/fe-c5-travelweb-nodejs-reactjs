import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Container, Typography, Button, CircularProgress } from '@mui/material';
import AuthService from '../../service/AuthService';
import CodeInput from './CodeInput';

const ForgotPassword: React.FC = () => {
  // Các state để điều khiển tiến trình: Stage 1 (nhập email), Stage 2 (nhập mã xác minh), Stage 3 (đặt lại mật khẩu)
  const [email, setEmail] = useState<string>('');
  const [activationCode, setActivationCode] = useState<string[]>(Array(6).fill(''));
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [stage, setStage] = useState<number>(1);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Stage 1: Gửi mã xác minh về email
  const handleSendActivationCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const data = await AuthService.forgotPassword(email.trim());
      // Cập nhật theo định dạng: data = { success: true, data: { message: "..." } }
      if (data && data.data && data.data.message) {
        setMessage(data.data.message);
        setStage(2);
      } else {
        setError('Không thể gửi mã đặt lại mật khẩu. Vui lòng thử lại.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể gửi mã đặt lại mật khẩu.');
    }
    setIsLoading(false);
  };

  // Stage 2: Xác minh mã xác nhận
  const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = activationCode.join('');
    setIsLoading(true);
    setError('');
    try {
      const data = await AuthService.verifyCode(email.trim(), code);
      // Giả sử verifyCode trả về cấu trúc: { success: true, data: { message: "...", token: "..." } }
      if (data && data.data && data.data.message && data.data.token) {
        setMessage(data.data.message);
        setStage(3);
        // Lưu token reset vào localStorage để dùng ở bước đặt lại mật khẩu
        localStorage.setItem('resetToken', data.data.token);
      } else {
        setError('Mã xác minh không hợp lệ. Vui lòng thử lại.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể xác minh mã xác nhận.');
    }
    setIsLoading(false);
  };

  // Stage 3: Đặt lại mật khẩu mới
  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError('Mật khẩu không khớp.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const resetToken = localStorage.getItem('resetToken');
      if (!resetToken) {
        setError('Token không hợp lệ.');
        setIsLoading(false);
        return;
      }
      const data = await AuthService.resetPassword(resetToken, newPassword);
      // Giả sử resetPassword trả về: { success: true, data: { message: "..." } }
      if (data && data.data && data.data.message) {
        setMessage(data.data.message);
        localStorage.removeItem('resetToken');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError('Không thể đặt lại mật khẩu. Vui lòng thử lại.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể đặt lại mật khẩu.');
    }
    setIsLoading(false);
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  // Cập nhật từng ô nhập mã; cho phép các ký tự 0-9 và a-f (hexadecimal)
  const handleCodeChange = (index: number, value: string) => {
    if (!/^[a-fA-F0-9]*$/.test(value)) return;
    const newCode = [...activationCode];
    newCode[index] = value.slice(-1);
    setActivationCode(newCode);
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === 'Backspace' && !activationCode[index] && index > 0) {
      const prevElement = document.getElementById(`code-input-${index - 1}`);
      if (prevElement) {
        prevElement.focus();
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(/images/Tokyo_japan.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: 'rgba(255,255,255,0.8)',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: '#00796b', fontWeight: 'bold' }}
        >
          {stage === 1
            ? 'Quên mật khẩu'
            : stage === 2
            ? 'Nhập mã xác minh'
            : 'Đặt lại mật khẩu'}
        </Typography>
        <form
          onSubmit={
            stage === 1
              ? handleSendActivationCode
              : stage === 2
              ? handleVerifyCode
              : handleResetPassword
          }
        >
          {stage === 1 && (
            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          {stage === 2 && (
            <CodeInput
              activationCode={activationCode}
              handleCodeChange={handleCodeChange}
              handleKeyDown={handleKeyDown}
              setActivationCode={setActivationCode}
            />
          )}
          {stage === 3 && (
            <>
              <TextField
                label="Mật khẩu mới"
                type="password"
                fullWidth
                variant="outlined"
                margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <TextField
                label="Xác nhận mật khẩu mới"
                type="password"
                fullWidth
                variant="outlined"
                margin="normal"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              marginTop: 2,
              backgroundColor: '#00796b',
              '&:hover': { backgroundColor: '#004d40' },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : stage === 1 ? (
              'Gửi mã'
            ) : stage === 2 ? (
              'Xác nhận mã'
            ) : (
              'Đặt lại mật khẩu'
            )}
          </Button>
        </form>
        {message && (
          <Typography color="success" sx={{ marginTop: 2 }}>
            {message}
          </Typography>
        )}
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          onClick={handleBackToLogin}
          variant="text"
          fullWidth
          sx={{ color: '#00796b', marginTop: 2 }}
        >
          Quay lại trang đăng nhập
        </Button>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
