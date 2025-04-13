import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  CircularProgress,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

import CityService from '../../../service/CityService';
import { City } from '../../../models/City';
import AddCity from './AddCity';
import EditCity from './EditCity';
import ViewCity from './ViewCity';
import DeleteCity from './DeleteCity';

const ManagerCity: React.FC = () => {
  const theme = useTheme();
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [mode, setMode] = useState<'add' | 'edit' | 'view' | 'delete' | null>(null);

  const fetchCities = async () => {
    setLoading(true);
    try {
      const response = await CityService.getCities();
      if (response.success) {
        const citiesData: City[] = response.data.map((c: any) => new City(c));
        setCities(citiesData);
      } else {
        alert('Dữ liệu thành phố không hợp lệ');
      }
    } catch (error) {
      alert('Lỗi khi tải danh sách thành phố');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const openAdd = () => { setMode('add'); setSelectedCity(null); };
  const openView = (city: City) => { setSelectedCity(city); setMode('view'); };
  const openEdit = (city: City) => { setSelectedCity(city); setMode('edit'); };
  const openDelete = (city: City) => { setSelectedCity(city); setMode('delete'); };
  const closeModal = () => { setMode(null); setSelectedCity(null); };
  const handleOperationSuccess = () => { fetchCities(); closeModal(); };

  return (
    <Box sx={{ width: '100%', mt: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight={600}>Quản Lý Thành Phố</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAdd}
        >
          Thêm Thành Phố Mới
        </Button>
      </Stack>

      <TextField
        fullWidth
        placeholder="Tìm kiếm thành phố..."
        variant="outlined"
        size="small"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
        sx={{ mb: 2 }}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>STT</TableCell>
                <TableCell sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>Tên Thành Phố</TableCell>
                <TableCell sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>Tỉnh</TableCell>
                <TableCell align="center" sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>Thao Tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCities.map((city, index) => (
                <TableRow key={city.id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell><Typography fontWeight={500}>{city.name}</Typography></TableCell>
                  <TableCell>{city.province?.name || city.provinceId}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="Xem thành phố">
                        <Button variant="contained" size="small" onClick={() => openView(city)} startIcon={<VisibilityIcon />} color="primary">Xem</Button>
                      </Tooltip>
                      <Tooltip title="Sửa thành phố">
                        <Button variant="contained" size="small" onClick={() => openEdit(city)} startIcon={<EditIcon />} color="success">Sửa</Button>
                      </Tooltip>
                      <Tooltip title="Xóa thành phố">
                        <Button variant="contained" size="small" onClick={() => openDelete(city)} startIcon={<DeleteIcon />} color="error">Xóa</Button>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}

              {filteredCities.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                    <Typography variant="body1" color="text.secondary">Không có thành phố nào</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal xử lý các hành động */}
      {mode === 'add' && <AddCity open={true} onClose={closeModal} onSuccess={handleOperationSuccess} />}
      {mode === 'edit' && selectedCity && <EditCity open={true} city={selectedCity} onClose={closeModal} onSuccess={handleOperationSuccess} />}
      {mode === 'view' && selectedCity && <ViewCity open={true} city={selectedCity} onClose={closeModal} />}
      {mode === 'delete' && selectedCity && <DeleteCity city={selectedCity} onClose={closeModal} onSuccess={handleOperationSuccess} />}
    </Box>
  );
};

export default ManagerCity;
