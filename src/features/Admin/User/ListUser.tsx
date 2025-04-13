// ListUser.tsx (Enhanced Material Design version)
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Stack,
  Avatar,
  Box,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import { Delete, Visibility, PersonOutline } from '@mui/icons-material';
import { IUser } from './ManagerUser';

interface IListUserProps {
  users: IUser[];
  onViewUser: (user: IUser) => void;
  onDeleteUser: (user: IUser) => void;
  currentUser: any;
}

const ListUser: React.FC<IListUserProps> = ({ users, onViewUser, onDeleteUser, currentUser }) => {
  const theme = useTheme();
  
  // Function to get initials from username
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Function to get avatar color based on username
  const getAvatarColor = (username: string) => {
    const colors = [
      '#1976d2', '#388e3c', '#d32f2f', '#7b1fa2', 
      '#c2185b', '#0288d1', '#303f9f', '#00796b',
      '#689f38', '#fbc02d', '#ef6c00', '#455a64'
    ];
    const index = username.charCodeAt(0) % colors.length;
    return colors[index];
  };
  
  // Function to get role color
  const getRoleColor = (roleName: string) => {
    const roleColors: {[key: string]: string} = {
      'Admin': 'error',
      'User': 'primary',
      'Manager': 'success',
      'Editor': 'info',
      'Viewer': 'warning',
    };
    
    return roleColors[roleName] || 'default';
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
      <TableContainer 
        component={Paper} 
        sx={{ 
          maxHeight: 'calc(100vh - 200px)', // Adjust based on your layout
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
              <TableCell align="center" sx={{ 
                fontWeight: 'bold', 
                backgroundColor: theme.palette.primary.main, 
                color: 'white',
                width: '60px'
              }}>STT</TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                backgroundColor: theme.palette.primary.main, 
                color: 'white',
                minWidth: '200px'
              }}>Tên Đăng Nhập</TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                backgroundColor: theme.palette.primary.main, 
                color: 'white',
                minWidth: '220px'
              }}>Email</TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                backgroundColor: theme.palette.primary.main, 
                color: 'white',
                minWidth: '150px'
              }}>Vai Trò</TableCell>
              <TableCell align="center" sx={{ 
                fontWeight: 'bold', 
                backgroundColor: theme.palette.primary.main, 
                color: 'white',
                width: '180px'
              }}>Hành Động</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user, index) => (
              <TableRow 
                key={user.id} 
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
                <TableCell align="center">
                  <Typography variant="body2" fontWeight={500}>
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar 
                      sx={{ 
                        bgcolor: getAvatarColor(user.username),
                        width: 36, 
                        height: 36,
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                      }}
                    >
                      {getInitials(user.username)}
                    </Avatar>
                    <Typography fontWeight={500}>{user.username}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {user.roles.map((role) => (
                      <Chip
                        key={role.id}
                        label={role.name}
                        size="small"
                        color={getRoleColor(role.name) as any}
                        variant="outlined"
                        sx={{ 
                          fontWeight: 500, 
                          my: 0.5,
                          borderRadius: '4px'
                        }}
                      />
                    ))}
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Tooltip title="Xem chi tiết">
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<Visibility />}
                        color="primary"
                        onClick={() => onViewUser(user)}
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
                    {currentUser && currentUser.isAdmin() && (
                      <Tooltip title="Xóa người dùng">
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<Delete />}
                          color="error"
                          onClick={() => onDeleteUser(user)}
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
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <PersonOutline sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5 }} />
                    <Typography variant="body1" color="text.secondary">
                      Không có người dùng nào
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListUser;