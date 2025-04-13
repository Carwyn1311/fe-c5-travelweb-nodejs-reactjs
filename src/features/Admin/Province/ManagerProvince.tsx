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

import { Province } from '../../../models/Provinces';
import ProvinceService from '../../../service/ProvinceService';
import AddProvince from './AddProvince';
import EditProvince from './EditProvince';
import ViewProvince from './ViewProvince';
import DeleteProvince from './DeleteProvince';

const ManagerProvince: React.FC = () => {
  const theme = useTheme();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [mode, setMode] = useState<'view' | 'edit' | 'add' | 'delete' | null>(null);

  const fetchProvinces = async () => {
    setLoading(true);
    try {
      const response = await ProvinceService.getProvinces();
      if (response.success) {
        setProvinces(response.data.map((p: any) => new Province(p)));
      }
    } catch (error) {
      console.error('Lỗi tải tỉnh:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filteredProvinces = provinces.filter(prov =>
    prov.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const openAdd = () => {
    setMode('add');
    setSelectedProvince(null);
  };

  const openView = (province: Province) => {
    setSelectedProvince(province);
    setMode('view');
  };

  const openEdit = (province: Province) => {
    setSelectedProvince(province);
    setMode('edit');
  };

  const openDelete = (province: Province) => {
    setSelectedProvince(province);
    setMode('delete');
  };

  const closeModal = () => {
    setMode(null);
    setSelectedProvince(null);
  };

  const handleOperationSuccess = () => {
    fetchProvinces();
    closeModal();
  };

  return (
    <Box sx={{ width: '100%', mt: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight={600}>Quản Lý Tỉnh</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAdd}
        >
          Thêm Tỉnh Mới
        </Button>
      </Stack>

      <TextField
        fullWidth
        placeholder="Tìm kiếm tỉnh..."
        variant="outlined"
        size="small"
        value={searchValue}
        onChange={handleSearchChange}
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
                <TableCell sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>Tên Tỉnh</TableCell>
                <TableCell sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>Quốc Gia</TableCell>
                <TableCell align="center" sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>Thao Tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProvinces.map((prov, index) => (
                <TableRow key={prov.id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell><Typography fontWeight={500}>{prov.name}</Typography></TableCell>
                  <TableCell>{prov.country}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="Xem tỉnh">
                        <Button variant="contained" size="small" onClick={() => openView(prov)} startIcon={<VisibilityIcon />} color="primary">Xem</Button>
                      </Tooltip>
                      <Tooltip title="Sửa tỉnh">
                        <Button variant="contained" size="small" onClick={() => openEdit(prov)} startIcon={<EditIcon />} color="success">Sửa</Button>
                      </Tooltip>
                      <Tooltip title="Xóa tỉnh">
                        <Button variant="contained" size="small" onClick={() => openDelete(prov)} startIcon={<DeleteIcon />} color="error">Xóa</Button>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}

              {filteredProvinces.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                    <Typography variant="body1" color="text.secondary">Không có tỉnh nào</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {mode === 'add' && <AddProvince visible={true} onClose={closeModal} onSuccess={handleOperationSuccess} />}
      {mode === 'edit' && selectedProvince && <EditProvince visible={true} province={selectedProvince} onClose={closeModal} onSuccess={handleOperationSuccess} />}
      {mode === 'view' && selectedProvince && <ViewProvince visible={true} province={selectedProvince} onClose={closeModal} />}
      {mode === 'delete' && selectedProvince && <DeleteProvince province={selectedProvince} onClose={closeModal} onSuccess={handleOperationSuccess} />}
    </Box>
  );
};

export default ManagerProvince;
