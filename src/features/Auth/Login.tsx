import React, { useState, useEffect } from "react";
import axiosInstance from "../AxiosInterceptor/Content/axiosInterceptor";
import { useNavigate } from "react-router-dom";
import {
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Box,
  Container,
  TextField,
} from "@mui/material";
import { TokenAuthService } from "../TokenAuthService/TokenAuthService";
import { User } from "../User/Content/User";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = User.getUserData();
    if (storedUser && storedUser.username) {
      setUserName(storedUser.username);
    }

    const storedUserName = localStorage.getItem("userName") ?? "";
    const storedPassword = localStorage.getItem("password") ?? "";
    const storedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (storedUserName && storedPassword) {
      setUserName(storedUserName);
      setPassword(storedPassword);
    }
    setRememberMe(storedRememberMe);
  }, []);

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userName || !password) {
      setError("All fields are required.");
      return;
    }

    await handleLogin();
  };

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/api/login", {
        username: userName,
        password: password,
      });

      const token = response.data?.jwt || response.data?.data?.jwt;
      const roles = response.data?.role;
      const email = response.data?.email;
      const userId = response.data?.userId;

      if (!token || !roles || roles.length === 0) {
        throw new Error("No token or role returned from API.");
      }

      const roleName = roles[0]?.name;

      localStorage.setItem("jwt", token);

      const user = new User({
        id: userId,
        username: userName,
        email: email || "",
        password: password,
        role: roleName,
        active: true,
      });

      if (rememberMe) {
        localStorage.setItem("userName", userName);
        localStorage.setItem("password", password);
        localStorage.setItem("role", roleName);
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
        localStorage.removeItem("userName");
        localStorage.removeItem("password");
        localStorage.removeItem("rememberMe");
      }

      User.storeUserData(user, token, rememberMe);
      TokenAuthService.setToken(token);

      onLogin();
      navigate("/");
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleCreateAccount = () => navigate("/create-account");

  const handleForgotPassword = () => navigate("/forgot-password");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: "url(/images/hanoi_login_new.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: 4,
          borderRadius: 2,
          boxShadow: 5,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#00796b", fontWeight: "bold" }}
        >
          DPT Travel Login
        </Typography>

        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ color: "#00796b" }}
        >
          Welcome to your journey
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            variant="outlined"
            margin="normal"
            value={userName}
            onChange={handleUserNameChange}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
            }
            label="Remember me"
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
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
            Log in
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Button
              variant="text"
              onClick={handleCreateAccount}
              sx={{ color: "#00796b" }}
            >
              Create Account
            </Button>
            <Button
              variant="text"
              onClick={handleForgotPassword}
              sx={{ color: "#00796b" }}
            >
              Forgot Password
            </Button>
          </Box>
        </form>
        <Typography
          align="center"
          sx={{ marginTop: 4, fontSize: "0.9rem", color: "#757575" }}
        >
          © 2024 DPT TRAVEL. <strong>Version 4.3.0.0 [20231608]</strong>
        </Typography>
      </Container>
    </Box>
  );
};

export default Login;
