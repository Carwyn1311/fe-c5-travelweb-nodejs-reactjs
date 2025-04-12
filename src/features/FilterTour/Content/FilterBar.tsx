import React from 'react';
import { TextField, Button, MenuItem, Box } from '@mui/material';

const FilterBar: React.FC = () => {
  return (
    <Box className="search-bar" sx={{ display: 'flex', gap: 2, alignItems: 'center', marginBottom: 3 }}>
      <TextField label="Tìm tour..." variant="outlined" fullWidth />
      <TextField
        label="Từ ngày"
        type="date"
        InputLabelProps={{ shrink: true }}
        sx={{ width: 150 }}
      />
      <TextField
        label="Đến ngày"
        type="date"
        InputLabelProps={{ shrink: true }}
        sx={{ width: 150 }}
      />
      <TextField select label="Loại tour" defaultValue="Trong nước" sx={{ width: 150 }}>
        <MenuItem value="Trong nước">Trong nước</MenuItem>
        <MenuItem value="Ngoài nước">Ngoài nước</MenuItem>
      </TextField>
      <Button variant="contained" color="primary">
        Tìm Kiếm
      </Button>
    </Box>
  );
};

export default FilterBar;
