import React from 'react';
import { Button as MUIButton } from '@mui/material';
import { SxProps } from '@mui/system';

interface ButtonProps {
  onClick?: () => void; // Hàm xử lý sự kiện khi click
  style?: React.CSSProperties; // CSS custom styles
  children?: React.ReactNode; // Nội dung bên trong nút
  className?: string; // Class CSS tùy chỉnh
  type?: 'primary' | 'default' | 'outlined' | 'text'; // Các kiểu nút bạn muốn hỗ trợ
  icon?: React.ReactNode; // Icon đi kèm
  sx?: SxProps; // Tùy chỉnh giao diện nhanh qua sx
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  style,
  children,
  className = '',
  type = 'default', // Giá trị mặc định
  icon,
  sx,
}) => {
  // Map type của bạn sang variant hợp lệ của Material-UI
  const variantMapping: Record<string, 'contained' | 'outlined' | 'text'> = {
    primary: 'contained',
    default: 'text',
    outlined: 'outlined',
    text: 'text',
  };

  const variant = variantMapping[type] || 'text';

  return (
    <MUIButton
      className={className} // Class CSS
      onClick={onClick} // Hàm xử lý click
      style={style} // Custom styles
      variant={variant} // Sử dụng variant đã ánh xạ
      startIcon={icon} // Icon nằm ở đầu nút
      sx={sx} // Tùy chỉnh giao diện nhanh qua sx
    >
      {children}
    </MUIButton>
  );
};

export default Button;
