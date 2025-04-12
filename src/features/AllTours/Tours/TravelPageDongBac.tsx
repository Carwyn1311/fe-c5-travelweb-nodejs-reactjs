import React from 'react';
import { Layout, Typography, Row, Col, Card, Image, Table, Button, List } from 'antd';
import '../.css/TravelPageDongBac.css'; // Đảm bảo đường dẫn CSS chính xác

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const TravelPageDongBac: React.FC = () => {
  const tourData = [
    {
      key: '1',
      departureDate: '02/12/2024',
      tourCode: 'STN084-2024-02823',
      price: '12.079.000',
      childPrice: '8.050.000',
      babyPrice: '4.000.000',
    },
  ];

  const columns = [
    {
      title: 'Khởi Hành',
      dataIndex: 'departureDate',
      key: 'departureDate',
    },
    {
      title: 'Mã Tour',
      dataIndex: 'tourCode',
      key: 'tourCode',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Giá Trẻ Em',
      dataIndex: 'childPrice',
      key: 'childPrice',
    },
    {
      title: 'Giá Em Bé',
      dataIndex: 'babyPrice',
      key: 'babyPrice',
      render: () => (
        <Button type="primary" className="buy-button">
          Mua Online
        </Button>
      ),
    },
  ];

  const highlights = [
    'Khởi hành thứ 2: 02/12/2024',
    'Vượt đèo Mã Pí Lèng - một trong “Tứ đại danh đèo” của vùng núi biên viễn phía Bắc',
    'Chiêm ngưỡng cảnh sắc đầy hùng vĩ và thơ mộng của thác Bản Giốc - một trong bốn thác nước là đường biên giới tự nhiên lớn nhất thế giới',
    'Đến hồ Ba Bể - viên ngọc trong xanh giữa núi rừng Đông Bắc, thưởng ngoạn phong cảnh của một trong 100 hồ nước đẹp nhất toàn cầu',
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
            Du lịch Hà Giang – Đồng Văn – Sông Nho Quế – Hồ Ba Bể – Bản Giốc – Lạng Sơn
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

        {/* Price Table */}
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Card className="tour-price-card">
              <Title level={4}>Thông tin giá tour</Title>
              <Table
                columns={columns}
                dataSource={tourData}
                pagination={false}
                bordered
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
                    alt={`Image ${idx + 1}`}
                    src={`/image1${idx + 1}.jpg`} // Thay bằng đường dẫn ảnh thực tế
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
      <Footer className="travel-footer">
        <Paragraph>© 2024 Saigontourist. Tất cả các quyền được bảo lưu.</Paragraph>
      </Footer>
    </Layout>
  );
};

export default TravelPageDongBac;
