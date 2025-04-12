import React from 'react';
import { Layout, Typography, Row, Col, Card, Image, List, Button } from 'antd';
import '../.css/TravelPageSapa.css'; // Đảm bảo đường dẫn CSS chính xác

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const TravelPageSapa: React.FC = () => {
  const highlights = [
    'Khởi hành thứ 7: 20/12/2024',
    'Khám phá Fansipan – nóc nhà Đông Dương với khung cảnh ngoạn mục',
    'Tham quan bản Cát Cát – ngôi làng cổ xinh đẹp với văn hóa truyền thống đặc sắc',
    'Chiêm ngưỡng thung lũng Mường Hoa – cánh đồng ruộng bậc thang tuyệt đẹp',
    'Thưởng thức ẩm thực Sapa với các món ăn đặc trưng vùng cao như lẩu cá hồi, thịt lợn cắp nách',
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
    <Layout className="sapa-layout">
      {/* Header */}
      <Header className="sapa-header">
        <div className="header-background">
          <Title level={2} className="header-title">
            Du lịch Sapa – Thưởng ngoạn vẻ đẹp vùng cao Tây Bắc
          </Title>
        </div>
      </Header>

      {/* Content */}
      <Content className="sapa-content">
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
              <div className="reasons-buttons">
                {reasons.map((reason, index) => (
                  <Button
                    key={index}
                    type="primary"
                    className="reason-button"
                    onClick={() => alert(`Bạn chọn: ${reason}`)} // Gắn hành động khi nhấn
                  >
                    {reason}
                  </Button>
                ))}
              </div>
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
                    alt={`Sapa Image ${idx + 1}`}
                    src={`/path/to/sapa-image${idx + 1}.jpg`} // Thay bằng đường dẫn ảnh thực tế
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
      <Footer className="sapa-footer">
        <Paragraph>© 2024 Saigontourist. Tất cả các quyền được bảo lưu.</Paragraph>
      </Footer>
    </Layout>
  );
};

export default TravelPageSapa;
