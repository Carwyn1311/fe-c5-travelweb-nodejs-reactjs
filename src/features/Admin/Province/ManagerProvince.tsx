// ManagerProvince.tsx (Material UI version - Fixed)
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Stack,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  useTheme,
  alpha,
  Alert
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Public as PublicIcon,
  LocationCity as LocationCityIcon,
  Close as CloseIcon
} from '@mui/icons-material';

import { Province } from '../../../models/Provinces';
import ProvinceService from '../../../service/ProvinceService';
import AddProvince from './AddProvince';
import EditProvince from './EditProvince';
import ViewProvince from './ViewProvince';
import DeleteProvince from './DeleteProvince';

// Wrapper component for AddProvince to adapt it to Material UI Dialog
const AddProvinceWrapper = ({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) => {
  return (
    <>
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        pb: 2
      }}>
        <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AddIcon />
          Thêm Tỉnh Mới
        </Typography>
        <IconButton aria-label="close" onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        {/* Render the original AddProvince component without its own modal/dialog */}
        <AddProvinceContent onClose={onClose} onSuccess={onSuccess} />
      </DialogContent>
    </>
  );
};

// This is a placeholder for your actual AddProvince content
// Replace this with your actual form implementation
const AddProvinceContent = ({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('Việt Nam');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Vui lòng nhập tên tỉnh');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call - replace with your actual service call
      // const response = await ProvinceService.addProvince({ name, country });
      // if (response.success) {
      //   onSuccess();
      // } else {
      //   setError('Không thể thêm tỉnh mới');
      // }
      
      // For demo purposes, we'll just simulate success after a delay
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } catch (err) {
      setError('Đã xảy ra lỗi khi thêm tỉnh mới');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box sx={{ py: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <TextField
        fullWidth
        label="Tên Tỉnh"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        variant="outlined"
        required
        sx={{ mb: 2 }}
      />
      
      <TextField
        fullWidth
        label="Quốc Gia"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        margin="normal"
        variant="outlined"
        sx={{ mb: 3 }}
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
        <Button 
          variant="outlined" 
          onClick={onClose}
          disabled={loading}
        >
          Hủy
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Đang xử lý...' : 'Tạo Tỉnh'}
        </Button>
      </Box>
    </Box>
  );
};

// Similar wrappers for other components
const EditProvinceWrapper = ({ province, onClose, onSuccess }: { province: Province, onClose: () => void, onSuccess: () => void }) => {
  return (
    <>
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        pb: 2
      }}>
        <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EditIcon />
          Chỉnh Sửa Tỉnh
        </Typography>
        <IconButton aria-label="close" onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <EditProvince visible={true} province={province} onClose={onClose} onSuccess={onSuccess} />
      </DialogContent>
    </>
  );
};

const ViewProvinceWrapper = ({ province, onClose }: { province: Province, onClose: () => void }) => {
  return (
    <>
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        pb: 2
      }}>
        <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <VisibilityIcon />
          Thông Tin Tỉnh
        </Typography>
        <IconButton aria-label="close" onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <ViewProvince visible={true} province={province} onClose={onClose} />
      </DialogContent>
    </>
  );
};

const DeleteProvinceWrapper = ({ province, onClose, onSuccess }: { province: Province, onClose: () => void, onSuccess: () => void }) => {
  return (
    <>
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        pb: 2
      }}>
        <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'error.main' }}>
          <DeleteIcon />
          Xóa Tỉnh
        </Typography>
        <IconButton aria-label="close" onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <DeleteProvince province={province} onClose={onClose} onSuccess={onSuccess} />
      </DialogContent>
    </>
  );
};

const ManagerProvince: React.FC = () => {
  const theme = useTheme();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [mode, setMode] = useState<'view' | 'edit' | 'add' | 'delete' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProvinces = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ProvinceService.getProvinces();
      if (response.success) {
        const provinceData: Province[] = response.data.map((prov: any) => new Province(prov));
        setProvinces(provinceData);
      } else {
        setError('Không thể tải danh sách tỉnh');
      }
    } catch (error) {
      setError('Không thể tải danh sách tỉnh');
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

  // Function to get color based on province name
  const getProvinceColor = (name: string) => {
    const colors = [
      '#1976d2', '#388e3c', '#d32f2f', '#7b1fa2', 
      '#c2185b', '#0288d1', '#303f9f', '#00796b',
      '#689f38', '#fbc02d', '#ef6c00', '#455a64'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Function to get initials from province name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Box sx={{ p: 3, maxWidth: '100%' }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          borderRadius: '12px',
          backgroundColor: theme.palette.background.paper
        }}
      >
        {/* Header */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3
          }}
        >
          <Typography 
            variant="h5" 
            component="h1" 
            sx={{ 
              fontWeight: 600,
              color: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <LocationCityIcon fontSize="large" />
            Quản Lý Tỉnh
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={openAdd}
            sx={{ 
              borderRadius: '8px',
              textTransform: 'none',
              px: 2,
              py: 1,
              boxShadow: 3,
              '&:hover': {
                boxShadow: 5
              }
            }}
          >
            Thêm Mới
          </Button>
        </Box>

        {/* Search Box */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Tìm kiếm tỉnh..."
            value={searchValue}
            onChange={handleSearchChange}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              sx: { 
                borderRadius: '8px',
                backgroundColor: alpha(theme.palette.common.white, 0.9),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.common.white, 1),
                },
                boxShadow: '0 2px 5px rgba(0,0,0,0.08)'
              }
            }}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                },
                '&:hover fieldset': {
                  borderColor: alpha(theme.palette.primary.main, 0.5),
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />
        </Box>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Province List */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer 
            component={Paper} 
            sx={{ 
              maxHeight: 'calc(100vh - 250px)',
              overflowY: 'auto',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              borderRadius: '12px',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#c1c1c1',
                borderRadius: '10px',
                '&:hover': {
                  background: '#a8a8a8',
                },
              },
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell 
                    sx={{ 
                      fontWeight: 'bold', 
                      backgroundColor: theme.palette.primary.main, 
                      color: 'white',
                      minWidth: '250px'
                    }}
                  >
                    Tên Tỉnh
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 'bold', 
                      backgroundColor: theme.palette.primary.main, 
                      color: 'white',
                      minWidth: '200px'
                    }}
                  >
                    Quốc Gia
                  </TableCell>
                  <TableCell 
                    align="center"
                    sx={{ 
                      fontWeight: 'bold', 
                      backgroundColor: theme.palette.primary.main, 
                      color: 'white',
                      width: '220px'
                    }}
                  >
                    Thao Tác
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProvinces.length > 0 ? (
                  filteredProvinces.map((province, index) => (
                    <TableRow 
                      key={province.id} 
                      hover
                      sx={{
                        '&:nth-of-type(odd)': {
                          backgroundColor: theme.palette.action.hover,
                        },
                        '&:last-child td, &:last-child th': {
                          border: 0,
                        },
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.08)',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                        }
                      }}
                    >
                      <TableCell>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar 
                            sx={{ 
                              bgcolor: getProvinceColor(province.name),
                              width: 40, 
                              height: 40,
                              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                            }}
                          >
                            {getInitials(province.name)}
                          </Avatar>
                          <Typography fontWeight={500}>{province.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={<PublicIcon />}
                          label={province.country}
                          variant="outlined"
                          color="primary"
                          size="medium"
                          sx={{ 
                            fontWeight: 500,
                            borderRadius: '8px',
                            px: 1
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <Tooltip title="Xem chi tiết">
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<VisibilityIcon />}
                              color="primary"
                              onClick={() => openView(province)}
                              sx={{ 
                                borderRadius: '8px',
                                textTransform: 'none',
                                boxShadow: 2,
                                '&:hover': {
                                  boxShadow: 4
                                }
                              }}
                            >
                              Xem
                            </Button>
                          </Tooltip>
                          <Tooltip title="Chỉnh sửa">
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<EditIcon />}
                              color="info"
                              onClick={() => openEdit(province)}
                              sx={{ 
                                borderRadius: '8px',
                                textTransform: 'none',
                                boxShadow: 2,
                                '&:hover': {
                                  boxShadow: 4
                                }
                              }}
                            >
                              Sửa
                            </Button>
                          </Tooltip>
                          <Tooltip title="Xóa tỉnh">
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<DeleteIcon />}
                              color="error"
                              onClick={() => openDelete(province)}
                              sx={{ 
                                borderRadius: '8px',
                                textTransform: 'none',
                                boxShadow: 2,
                                '&:hover': {
                                  boxShadow: 4
                                }
                              }}
                            >
                              Xóa
                            </Button>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <LocationCityIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5 }} />
                        <Typography variant="body1" color="text.secondary">
                          Không tìm thấy tỉnh nào
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Modals */}
      {mode === 'add' && (
        <Dialog 
          open={true} 
          onClose={closeModal}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '12px',
              boxShadow: 24,
              bgcolor: 'background.paper', // Ensure proper background color
            }
          }}
        >
          <AddProvinceWrapper onClose={closeModal} onSuccess={handleOperationSuccess} />
        </Dialog>
      )}

      {mode === 'edit' && selectedProvince && (
        <Dialog 
          open={true} 
          onClose={closeModal}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '12px',
              boxShadow: 24,
              bgcolor: 'background.paper',
            }
          }}
        >
          <EditProvinceWrapper province={selectedProvince} onClose={closeModal} onSuccess={handleOperationSuccess} />
        </Dialog>
      )}

      {mode === 'view' && selectedProvince && (
        <Dialog 
          open={true} 
          onClose={closeModal}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '12px',
              boxShadow: 24,
              bgcolor: 'background.paper',
            }
          }}
        >
          <ViewProvinceWrapper province={selectedProvince} onClose={closeModal} />
        </Dialog>
      )}

      {mode === 'delete' && selectedProvince && (
        <Dialog 
          open={true} 
          onClose={closeModal}
          maxWidth="sm"
          PaperProps={{
            sx: {
              borderRadius: '12px',
              boxShadow: 24,
              bgcolor: 'background.paper',
            }
          }}
        >
          <DeleteProvinceWrapper province={selectedProvince} onClose={closeModal} onSuccess={handleOperationSuccess} />
        </Dialog>
      )}
    </Box>
  );
};

export default ManagerProvince;