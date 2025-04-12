import React, { useEffect, useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import axiosInstance from '../AxiosInterceptor/Content/axiosInterceptor';

interface WishlistProps {
  wishlistList: Array<{
    id: number;
    created_at: string;
    destination_id: number;
  }>;
}

const Wishlist: React.FC<WishlistProps> = ({ wishlistList }) => {
  const [destinations, setDestinations] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchDestinationNames = async () => {
      const names: { [key: number]: string } = {};
      for (const item of wishlistList) {
        try {
          const response = await axiosInstance.get(`/api/dest/${item.destination_id}`);
          names[item.destination_id] = response.data.name;
        } catch (error) {
          console.error(`Error fetching destination ${item.destination_id}:`, error);
        }
      }
      setDestinations(names);
    };

    fetchDestinationNames();
  }, [wishlistList]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Danh Sách Yêu Thích</Typography>
      <List>
        {wishlistList.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={`Ngày thêm: ${new Date(item.created_at).toLocaleDateString()}`}
              secondary={`Tên Điểm đến: ${destinations[item.destination_id] || 'Đang tải...'}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Wishlist;
