import React from 'react';
import { Typography, Box } from '@mui/material';

interface QRCodeDisplayProps {
  qrCodeUrl: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrCodeUrl }) => {
  if (!qrCodeUrl) return null; // Trả về null nếu không có QR code URL
  
  return (
    <Box sx={{ textAlign: 'center', margin: '20px 0' }}>
      <Typography variant="h6" component="h3">Quét mã QR để thanh toán</Typography>
      <img src={qrCodeUrl} alt="QR Code" width="150" />
    </Box>
  );
};

export default QRCodeDisplay;
