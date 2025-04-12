import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { LocationOn, Phone, Email } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "../css/ContactPage.css"; // Tạo CSS riêng cho trang này

const 
ContactPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box className="contact-page" sx={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" gutterBottom>
        Công ty TNHH Một Thành Viên Dịch vụ Lữ hành DPT Travel
      </Typography>

      {/* Địa chỉ */}
      <Box className="contact-item" sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <LocationOn sx={{ color: "#ff6f00", marginRight: "10px" }} />
        <Typography variant="h6">Địa chỉ</Typography>
      </Box>
      <Typography variant="body1" gutterBottom>
      345 Đỗ Xuân Hợp, Quận 9, TP.HCM.
      </Typography>

      {/* Tư vấn và đặt dịch vụ */}
      <Box className="contact-item" sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <Phone sx={{ color: "#ff6f00", marginRight: "10px" }} />
        <Typography variant="h6">Tư vấn & đặt dịch vụ</Typography>
      </Box>
      <Typography variant="body1" gutterBottom>
        Điện thoại: (84-28) 38 279 XXX
      </Typography>
      <Typography variant="body1" gutterBottom>
        Hotline: 1900 XXXX
      </Typography>

      {/* Email */}
      <Box className="contact-item" sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <Email sx={{ color: "#ff6f00", marginRight: "10px" }} />
        <Typography variant="h6">Email</Typography>
      </Box>
      <Typography variant="body1" gutterBottom>
        info@dptravel.net
      </Typography>

      {/* Xem thêm thông tin văn phòng */}
      <Button
        variant="contained"
        color="primary"
        sx={{ display: "block", marginTop: "20px" }}
        onClick={() => navigate("/branch-offices")}
      >
        Xem địa chỉ các Văn phòng Chi nhánh Lữ hành DPT Travel
      </Button>
    </Box>
  );
};

export default ContactPage;
