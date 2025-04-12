import React from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';
import '../.css/ScrollToTopButton.css';

interface ScrollToTopButtonProps {
  className?: string; // Optional className prop
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ className }) => {
  // Hàm cuộn trang lên đầu
  const scrollToTop = () => {
    // Kiểm tra liệu trang có thể cuộn được không
    console.log("Scrolling to top...");
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Cuộn mượt mà
    });
  };

  return (
    <button
      className={`scroll-to-top ${className || ''}`} // Kết hợp className mặc định và tùy chỉnh
      onClick={scrollToTop} // Gắn sự kiện click
      aria-label="Scroll to top"
    >
      <ArrowUpOutlined />
    </button>
  );
};

export default ScrollToTopButton;
