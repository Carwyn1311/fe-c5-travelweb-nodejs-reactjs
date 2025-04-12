import React from 'react';
import { Layout, Typography, Row, Col, Card, Image, List, Button } from 'antd';
import '../.css/TravelPageHaLong.css'; // Đảm bảo đường dẫn chính xác

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const HalongTravelPage: React.FC = () => {
  const highlights = [
    'Khởi hành thứ 6: 15/12/2024',
    'Khám phá vịnh Hạ Long - Di sản thiên nhiên thế giới được UNESCO công nhận',
    'Tham quan động Thiên Cung, hang Đầu Gỗ với những kỳ quan thiên nhiên tuyệt đẹp',
    'Thưởng thức hải sản tươi ngon và đặc sản vùng biển Hạ Long',
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
    <Layout className="halong-layout">
      {/* Header */}
      <Header className="halong-header">
        <div className="header-background">
          <Title level={2} className="header-title">
            Du lịch Hạ Long – Khám phá kỳ quan thiên nhiên thế giới
          </Title>
        </div>
      </Header>

      {/* Content */}
      <Content className="halong-content">
        <Row gutter={[16, 16]} className="tour-info-row">
          {/* Highlights */}
          <Col xs={24} sm={16}>
            <Card className="tour-highlights">
              <Title level={4}>Tour này có gì hay</Title>
              <List
                dataSource={highlights}
                renderItem={(item) => (
                  <List.Item>
                    <Paragraph>- {item}</Paragraph>
                  </List.Item>
                )}
              />
              <Button type="default" className="program-button">
                In chương trình tour
              </Button>
            </Card>
          </Col>
          {/* Reasons to buy */}
          <Col xs={24} sm={8}>
            <Card className="buy-reasons">
              <Title level={4}>Vì sao nên mua tour online?</Title>
              <List
                dataSource={reasons}
                renderItem={(item) => (
                  <List.Item>
                    <Paragraph>{item}</Paragraph>
                  </List.Item>
                )}
              />
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
                    alt={`Hạ Long Image ${idx + 1}`}
                    src={`/path/to/halong-image${idx + 1}.jpg`} // Thay bằng đường dẫn ảnh thực tế
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
              <List
                dataSource={brandInfo}
                renderItem={(item) => (
                  <List.Item>
                    <Paragraph>{item}</Paragraph>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card className="app-info">
              <Title level={4}>Tải app</Title>
              <Image
                alt="App download"
                src="/path/to/app-image.jpg" // Thay bằng ảnh ứng dụng thực tế
                preview={false}
              />
            </Card>
          </Col>
        </Row>
      </Content>

      {/* Footer */}
      <Footer className="halong-footer">
        <Paragraph>© 2024 Saigontourist. Tất cả các quyền được bảo lưu.</Paragraph>
      </Footer>
    </Layout>
  );
};

export default HalongTravelPage;
