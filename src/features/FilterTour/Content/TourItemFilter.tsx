import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button, Rating } from '@mui/material';
import { Destination } from '../../Admin/Destination/listdest';

const TourItemFilter: React.FC<{ destination: Destination }> = ({ destination }) => {
  const { name, location, adult_price, child_price, destination_images, reviews } = destination;

  const averageRating =
    reviews && reviews.length > 0
      ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
      : "0";

  return (
    <Card className="tour-item" sx={{ display: 'flex', marginBottom: 2, boxShadow: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 200 }}
        image={destination_images && destination_images.length > 0 ? destination_images[0].image_url : '/default-image.jpg'}
        alt={name}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {location}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Giá vé: {(adult_price || 0).toLocaleString()} VND (Người lớn) / {(child_price || 0).toLocaleString()} VND (Trẻ em)
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Rating value={parseFloat(averageRating)} readOnly precision={0.5} />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {averageRating} ({reviews ? reviews.length : 0} đánh giá)
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 2 }}
          href="#" // Cập nhật đường dẫn nếu cần
        >
          Xem thêm
        </Button>
      </CardContent>
    </Card>
  );
};

export default TourItemFilter;
