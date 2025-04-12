import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel, Button, Typography, Box, Container, TextField } from "@mui/material";
import { User } from "../User/Content/User";
import AuthService from "../../service/AuthService";

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
    const trimmedUsername = userName.trim();
    const trimmedPassword = password.trim();
    if (!trimmedUsername || !trimmedPassword) {
      setError("All fields are required.");
      return;
    }
    await handleLogin(trimmedUsername, trimmedPassword);
  };

  const handleLogin = async (trimmedUsername: string, trimmedPassword: string) => {
    try {
      const data = await AuthService.login(trimmedUsername, trimmedPassword); // Sử dụng AuthService

      let token = data.jwt || data.token;

      const userData = data.user ? data.user : data;
      if (!token) {
        console.warn("No token returned from API. Using fallback token (user ID).");
        token = userData._id;
      }

      const role: number =
        userData.roles &&
        userData.roles.length > 0 &&
        userData.roles[0].name.toUpperCase() === "ADMIN"
          ? 1
          : 2;

      const user = new User({
        id: userData._id,
        username: trimmedUsername,
        email: userData.email,
        password: trimmedPassword,
        role: role,
        fullname: userData.fullname || "",
        active: true,
        activationCode: "",
        resetToken: "",
      });

      if (rememberMe) {
        localStorage.setItem("userName", trimmedUsername);
        localStorage.setItem("password", trimmedPassword);
        localStorage.setItem("role", role.toString());
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
        localStorage.removeItem("userName");
        localStorage.removeItem("password");
        localStorage.removeItem("rememberMe");
      }

      User.storeUserData(user, token, rememberMe);
      onLogin();
      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Login failed. Please try again.");
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
          Cherry Travel Login
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
            control={<Checkbox checked={rememberMe} onChange={handleRememberMeChange} />}
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
              "&:hover": { backgroundColor: "#004d40" },
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
