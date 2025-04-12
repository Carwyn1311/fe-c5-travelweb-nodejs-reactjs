import '../.css/TravelPageHaNoi.css'; 
import React from 'react';
import { Layout, Typography, Row, Col, Card, Image, Button } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const TravelPageHaNoi: React.FC = () => {
  const highlights = [
    'Khám phá thủ đô ngàn năm văn hiến',
    'Tham quan Hồ Gươm - biểu tượng của Hà Nội',
    'Thăm Văn Miếu - Quốc Tử Giám, trường đại học đầu tiên của Việt Nam',
    'Khám phá phố cổ Hà Nội với nét truyền thống độc đáo',
  ];

  const reasons = [
    'An toàn - Bảo mật',
    'Tiện lợi, tiết kiệm thời gian',
    'Không tính phí giao dịch',
    'Giao dịch bảo đảm',
    'Nhận thêm ưu đãi',
  ];

  const brandInfo = [
    'Thành lập từ năm 1975',
    'Thương hiệu lữ hành hàng đầu',
    'Thương hiệu quốc gia',
  ];

  return (
    <Layout className="travel-layout">
      {/* Header */}
      <Header className="travel-header">
        <div className="header-background">
          <Title level={2} className="header-title">
            Du lịch Hà Nội – Khám phá thủ đô ngàn năm văn hiến
          </Title>
        </div>
      </Header>

      {/* Content */}
      <Content className="travel-content">
        <Row gutter={[16, 16]} className="tour-info-row">
          {/* Highlights */}
          <Col xs={24} sm={16}>
            <Card className="tour-highlights">
              <Title level={4}>Tour này có gì hay</Title>
              {highlights.map((item, index) => (
                <Paragraph key={index} className="highlight-item">
                  - {item}
                </Paragraph>
              ))}
              <Button type="default" className="program-button">
                In chương trình tour
              </Button>
            </Card>
          </Col>

          {/* Reasons to buy */}
          <Col xs={24} sm={8}>
            <Card className="buy-reasons">
              <Title level={4}>Vì sao nên mua tour online?</Title>
              {reasons.map((item, index) => (
                <Paragraph key={index}>{item}</Paragraph>
              ))}
            </Card>
          </Col>
        </Row>

        {/* Images Section */}
        <Row gutter={[16, 16]}>
          {[...Array(6)].map((_, idx) => (
            <Col xs={24} sm={12} md={8} key={idx}>
              <Card
                hoverable
                className="tour-image-card"
                cover={
                  <Image
                    alt={`Image ${idx + 1}`}
                    src={`/assets/images/ha-noi-image${idx + 1}.jpg`} // Thay bằng đường dẫn ảnh thực tế
                    preview={false}
                  />
                }
              />
            </Col>
          ))}
        </Row>

        {/* Brand Info */}
        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
          <Col xs={24} sm={12}>
            <Card className="brand-info">
              <Title level={4}>Thương hiệu uy tín</Title>
              {brandInfo.map((item, index) => (
                <Paragraph key={index}>{item}</Paragraph>
              ))}
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card className="app-info">
              <Title level={4}>Tải app</Title>
              <Image
                alt="App download"
                src="/assets/images/app-image.jpg" // Thay bằng ảnh ứng dụng thực tế
                preview={false}
              />
            </Card>
          </Col>
        </Row>
      </Content>

      {/* Footer */}
      <Footer className="travel-footer">
        <Paragraph>© 2024 Du lịch Việt Nam. Tất cả các quyền được bảo lưu.</Paragraph>
      </Footer>
    </Layout>
  );
};

export default TravelPageHaNoi;
