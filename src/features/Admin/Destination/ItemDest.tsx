import React, { useState, useEffect } from 'react';
import { Descriptions, Tag, Image, Row, Col, List, Typography, Button } from 'antd';
import DoctoHtml from './DoctoHTML';
import '../css/ItemDes.css';
import { Destination, Itinerary } from './listdest'; // Nhập interface từ listdest.ts

interface ItemDestProps {
  destination: Destination;
}

const ItemDest: React.FC<ItemDestProps> = ({ destination }) => {
  const [docUrl, setDocUrl] = useState<string | null>(null);

  // Xử lý tải mô tả chi tiết từ file DOCX
  useEffect(() => {
    if (destination.descriptionFile && destination.descriptionFile.filePath) {
      setDocUrl(destination.descriptionFile.filePath);
    }
  }, [destination.descriptionFile]);

  // Hiển thị lịch trình
  const renderItineraries = (itineraries: Itinerary[]) => (
    <List
      itemLayout="vertical"
      dataSource={itineraries}
      renderItem={(itinerary) => (
        <List.Item key={itinerary.id}>
          <Typography.Title level={5}>Lịch trình #{itinerary.id}</Typography.Title>
          <p>
            <strong>Bắt đầu:</strong> {itinerary.start_date} <br />
            <strong>Kết thúc:</strong> {itinerary.end_date}
          </p>
          <List
            size="small"
            header={<strong>Hoạt động:</strong>}
            bordered
            dataSource={itinerary.activities}
            renderItem={(activity) => (
              <List.Item key={activity.id}>
                {activity.activity_name} ({activity.start_time} - {activity.end_time})
              </List.Item>
            )}
          />
        </List.Item>
      )}
    />
  );

  return (
    <div className="destination-detail">
      {/* Phần tiêu đề */}
      <section>
        <div
          className="pageTitle"
          style={{
            backgroundImage: `url(${destination.destinationImages[0]?.image_url || ''})`,
            height: '300px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      </section>

      {/* Thông tin chi tiết */}
      <Descriptions bordered column={1} title="Chi Tiết Điểm Đến">
        <Descriptions.Item label="Tên Điểm Đến">{destination.name}</Descriptions.Item>
        <Descriptions.Item label="Mô Tả">{destination.description || 'Không có mô tả'}</Descriptions.Item>
        <Descriptions.Item label="Địa Điểm">{destination.location}</Descriptions.Item>
        <Descriptions.Item label="Loại">
          <Tag color={destination.type === 'DOMESTIC' ? 'blue' : 'green'}>
            {destination.type === 'DOMESTIC' ? 'Trong Nước' : 'Quốc Tế'}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Thành Phố">{String(destination.city)}</Descriptions.Item>
        {destination.destinationImages.length > 0 && (
          <Descriptions.Item label="Hình ảnh">
            <Row gutter={16}>
              {destination.destinationImages.map((image) => (
                <Col span={8} key={image.id}>
                  <Image width="100%" src={image.image_url} alt={`Image ${image.id}`} />
                </Col>
              ))}
            </Row>
          </Descriptions.Item>
        )}
        {docUrl && (
          <Descriptions.Item label="Mô Tả Chi Tiết (DOCX)">
            <DoctoHtml filePath={docUrl} />
          </Descriptions.Item>
        )}
      </Descriptions>

      {/* Lịch trình */}
      <Typography.Title level={4} style={{ marginTop: 20 }}>
        Lịch Trình
      </Typography.Title>
      {destination.itineraries.length > 0 ? (
        renderItineraries(destination.itineraries)
      ) : (
        <p>Không có lịch trình</p>
      )}

      {/* Nút đặt chỗ */}
      <Button type="primary" style={{ marginTop: 20 }}>
        Đặt chỗ
      </Button>
    </div>
  );
};

export default ItemDest;
