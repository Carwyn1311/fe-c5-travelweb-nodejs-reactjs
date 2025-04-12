import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button, Rating } from '@mui/material';
import { Destination } from '../../Admin/Destination/listdest';


const TourItemFilter: React.FC<{ destination: Destination }> = ({ destination }) => {
  const { name, location, ticketPrice, destinationImages, reviewsList } = destination;

  const averageRating = (
    reviewsList.reduce((acc, review) => acc + review.rating, 0) / reviewsList.length
  ).toFixed(1);

  return (
    <Card className="tour-item" sx={{ display: 'flex', marginBottom: 2, boxShadow: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 200 }}
        image={destinationImages[0]?.image_url || '/default-image.jpg'} // Hiển thị ảnh đầu tiên hoặc ảnh mặc định
        alt={name}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {location}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Giá vé: {ticketPrice.adult_price.toLocaleString()} VND (Người lớn) / {ticketPrice.child_price.toLocaleString()} VND (Trẻ em)
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Rating value={parseFloat(averageRating)} readOnly precision={0.5} />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {averageRating} ({reviewsList.length} đánh giá)
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 2 }}
          href="#" // Đường dẫn mã hóa
        >
          Xem thêm
        </Button>
      </CardContent>
    </Card>
  );
};

export default TourItemFilter;
