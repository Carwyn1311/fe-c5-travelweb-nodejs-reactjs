// ManagerCity.tsx
import React, { useState, useEffect } from 'react';
import { 
  Box, Button, IconButton, InputBase, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Stack, Dialog 
} from '@mui/material';
import { Search as SearchIcon, Visibility as VisibilityIcon, Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import CityService from '../../../service/CityService';
import { City } from '../../../models/City';
import AddCity from './AddCity';
import EditCity from './EditCity';
import ViewCity from './ViewCity';
import DeleteCity from './DeleteCity';

const ManagerCity: React.FC = () => {
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
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Quản Lý Thành Phố</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}>
          Thêm Thành Phố Mới
        </Button>
      </Stack>

      <Paper
        component="form"
        sx={{ p: '2px 4px', mb: 2, display: 'flex', alignItems: 'center', width: 300 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Tìm kiếm thành phố..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          inputProps={{ 'aria-label': 'search city' }}
        />
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên Thành Phố</TableCell>
              <TableCell>Tỉnh</TableCell>
              <TableCell align="center">Thao Tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCities.map((city) => (
              <TableRow key={city.id}>
                <TableCell>{city.id}</TableCell>
                <TableCell>{city.name}</TableCell>
                <TableCell>{city.province?.name || city.provinceId}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => openView(city)}><VisibilityIcon /></IconButton>
                  <IconButton onClick={() => openEdit(city)}><EditIcon /></IconButton>
                  <IconButton onClick={() => openDelete(city)} color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {mode === 'add' && (
        <AddCity open={true} onClose={closeModal} onSuccess={handleOperationSuccess} />
      )}
      {mode === 'edit' && selectedCity && (
        <EditCity open={true} city={selectedCity} onClose={closeModal} onSuccess={handleOperationSuccess} />
      )}
      {mode === 'view' && selectedCity && (
        <ViewCity open={true} city={selectedCity} onClose={closeModal} />
      )}
      {mode === 'delete' && selectedCity && (
        <DeleteCity city={selectedCity} onClose={closeModal} onSuccess={handleOperationSuccess} />
      )}
    </Box>
  );
};

export default ManagerCity;
