import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Container, Typography, Button as MuiButton } from '@mui/material';
import axiosInstance from '../AxiosInterceptor/Content/axiosInterceptor';

const CreateAccounts: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (): Promise<void> => {
    try {
      const response = await axiosInstance.post(`${process.env.REACT_APP_BASE_URL}/api/register`, {
        username: userName,
        password: password,
        email: email,
        fullname: fullName,
        phone: phone,
      });

      if (response.status === 200) {
        console.log('User registered successfully');
        setSuccessMessage('User registered successfully');
        setError(null); // Clear any error messages
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(response.data.message || 'Failed to create account.');
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message || 'Failed to create account.');
      } else if (error.request) {
        setError('No response from the server.');
      } else {
        setError('An error occurred while creating the account.');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userName || !password || !email || !fullName || !phone) {
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
        backgroundImage: 'url(/images/Tokyo_japan.jpg)', // Background image giống như bên login
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Make the background slightly opaque
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#00796b", fontWeight: "bold" }}
        >
          Create Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type='input'
            label="Username"
            fullWidth
            variant="outlined"
            margin="normal"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            sx={{
              marginTop: 2,
              backgroundColor: "#00796b",
              "&:hover": {
                backgroundColor: "#004d40",
              },
            }}
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
