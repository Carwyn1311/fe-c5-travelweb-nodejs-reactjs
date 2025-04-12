import React from 'react';
import { AiFillCaretDown } from 'react-icons/ai'; // Icon tùy chỉnh
import { useForm } from 'react-hook-form';
import {
  Button,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

interface ListCheckButtonProps {
  items: string[];
  onSelectItem: (item: string) => void;
  className?: string;
}

interface FormValues {
  selectedItem: string | null;
}

const ListCheckButton: React.FC<ListCheckButtonProps> = ({
  items,
  onSelectItem,
  className,
}) => {
  const { setValue, watch } = useForm<FormValues>({
    defaultValues: { selectedItem: items[0] },
  });

  const selectedItem = watch('selectedItem');

  // State để quản lý mở/đóng menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (item: string) => {
    setValue('selectedItem', item);
    onSelectItem(item);
    handleClose(); // Đóng menu sau khi chọn item
  };

  return (
    <div className={className}>
      <Button
        variant="contained"
        onClick={handleClick}
        endIcon={<AiFillCaretDown />} // Icon nằm ở cuối nút
      >
        {selectedItem || items[0]}
      </Button>
      <Menu
        anchorEl={anchorEl} // Gắn menu vào nút
        open={open} // Trạng thái mở/đóng menu
        onClose={handleClose} // Đóng menu khi click ra ngoài
      >
        {items.map((item) => (
          <MenuItem key={item} onClick={() => handleItemClick(item)}>
            <Typography>{item}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ListCheckButton;
