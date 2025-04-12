import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Row, Col } from 'antd';
import 'antd/dist/reset.css'; // Đảm bảo reset styles của Ant Design
import '../css/ImgTransition.css';

interface ImgTransitionProps {
  imageUrl: string; // URL hình ảnh
  title: string; // Tiêu đề
  subtitle: string; // Phụ đề
  description: string; // Mô tả
  buttonText: string; // Văn bản nút
  buttonUrl: string; // URL khi nhấn nút
  position?: 'left' | 'right'; // Vị trí hiển thị nội dung
}

const ImgTransition: React.FC<ImgTransitionProps> = ({
  imageUrl,
  title,
  subtitle,
  description,
  buttonText,
  buttonUrl,
  position = 'left',
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (buttonUrl.startsWith('/')) {
      navigate(buttonUrl); // Điều hướng nội bộ
    } else {
      window.location.href = buttonUrl; // Điều hướng bên ngoài
    }
  };

  return (
    <section
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundAttachment: 'fixed', // Hình nền cố định
        backgroundSize: 'cover', // Hình nền bao phủ
        backgroundPosition: 'center', // Căn giữa hình nền
        padding: '60px 0',
        color: '#fff',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <Row gutter={[16, 16]} justify={position === 'right' ? 'end' : 'start'}>
          <Col
            xs={24}
            sm={20}
            md={12}
            lg={10}
            style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6))', // Hiệu ứng gradient
              borderRadius: '15px', // Bo góc mượt hơn
              padding: '25px',
              boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)', // Đổ bóng đẹp hơn
              transition: 'transform 0.3s ease', // Hiệu ứng hover
              marginLeft: '100px',
              marginRight: '100px'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')} // Hover scale lên
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} // Trả lại kích thước khi không hover
          >
            <Card
              bordered={false}
              style={{ background: 'transparent' }}
              title={
                <h2 style={{ color: '#ffdd57', textTransform: 'uppercase', marginBottom: '10px', fontSize: '16px' }}>
                  {subtitle}
                </h2>
              }
            >
              <h3 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '15px', fontSize: '22px' }}>
                {title}
              </h3>
              <p style={{ color: '#ddd', marginBottom: '20px', fontSize: '14px', lineHeight: '1.6' }}>
                {description}
              </p>
              <Button
                type="primary"
                size="large"
                style={{
                  backgroundColor: '#ff6700',
                  borderColor: '#ff6700',
                  borderRadius: '25px', // Nút bo tròn hơn
                  fontWeight: 'bold',
                  padding: '10px 20px',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ff4500'; // Đổi màu nền khi hover
                  e.currentTarget.style.transform = 'scale(1.1)'; // Phóng to nhẹ khi hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ff6700'; // Trả về màu gốc
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onClick={handleButtonClick}
              >
                {buttonText}
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ImgTransition;
