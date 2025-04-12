import React, { useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText, Button, Chip } from '@mui/material';

interface PaymentHistoryProps {
  paymentDetails: Array<{
    id: number;
    amount: number;
    payment_date: string;
    status: string;
    invoiceCode: string;
  }>;
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ paymentDetails }) => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paymentDetails.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(paymentDetails.length / itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'CANCELLED':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'Hoàn thành';
      case 'PENDING':
        return 'Đang chờ xử lý';
      case 'CANCELLED':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Lịch Sử Thanh Toán</Typography>
      <List>
        {currentItems.map((payment) => (
          <ListItem key={payment.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2, border: '1px solid #ccc', borderRadius: 4, padding: 2 }}>
            <Box sx={{ flex: 1, textAlign: 'left' }}>
              <ListItemText
                primary={`Ngày: ${new Date(payment.payment_date).toLocaleDateString()} - Số tiền: ${payment.amount.toLocaleString()} VND`}
                secondary={`Mã hóa đơn: ${payment.invoiceCode}`}
              />
            </Box>
            <Box sx={{ marginLeft: 'auto' }}>
              <Chip label={getStatusLabel(payment.status)} color={getStatusColor(payment.status)} sx={{ marginRight: 2 }} />
            </Box>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
          <Button
            key={page}
            variant={page === currentPage ? 'contained' : 'outlined'}
            onClick={() => handlePageChange(page)}
            sx={{ margin: 0.5 }}
          >
            {page}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default PaymentHistory;
