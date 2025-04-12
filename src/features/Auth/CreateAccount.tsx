import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Container, Typography, Button as MuiButton } from '@mui/material';
import AuthService from '../../service/AuthService';

const CreateAccounts: React.FC = () => {
  // Sử dụng các state cho 5 trường: username, email, password, fullname, phone
  const [username, setUsername] = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [fullname, setFullname]   = useState('');  // trường fullname: chữ n thường
  const [phone, setPhone]         = useState('');
  const [error, setError]         = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (): Promise<void> => {
    try {
      // Gọi hàm register và truyền đầy đủ 5 trường dữ liệu
      const data = await AuthService.register(username, email, password, fullname, phone);
      console.log('Register response: ', data);
      if (data && data.user && data.user.username) {
        setSuccessMessage(`User ${data.user.username} registered successfully`);
      } else {
        setSuccessMessage('User registered successfully');
      }
      setError(null);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      console.error('Register error: ', err.response);
      // Nếu backend trả về mảng lỗi, chuyển đổi từng mục lỗi (giả sử thuộc tính lỗi là "msg")
      if (err.response && err.response.data && Array.isArray(err.response.data.errors)) {
        const messages = err.response.data.errors.map((e: any) =>
          typeof e.msg === 'string' ? e.msg : JSON.stringify(e)
        );
        setError(messages.join(', '));
      } else {
        setError(err.message || 'Failed to create account.');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Kiểm tra rằng tất cả các trường phải có giá trị
    if (!username || !email || !password || !fullname || !phone) {
      setError('All fields are required.');
      return;
    }
    handleRegister();
  };

  const handleBackToLoginClick = (): void => {
    navigate('/login');
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
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ color: "#00796b", fontWeight: "bold" }}>
          Create Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="input"
            label="Username"
            fullWidth
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="input"
            fullWidth
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Full Name"
            type="input"
            fullWidth
            variant="outlined"
            margin="normal"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
          <TextField
            label="Phone"
            type="input"
            fullWidth
            variant="outlined"
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          {successMessage && <Typography color="success">{successMessage}</Typography>}
          <MuiButton
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2, backgroundColor: "#00796b", "&:hover": { backgroundColor: "#004d40" } }}
          >
            Create Account
          </MuiButton>
        </form>
        <MuiButton onClick={handleBackToLoginClick} variant="text" fullWidth sx={{ color: "#00796b", marginTop: 2 }}>
          Back to Login
        </MuiButton>
      </Container>
    </Box>
  );
};

export default CreateAccounts;
