import React, { useState } from 'react';
import { Drawer, Descriptions, Button, List, Typography } from 'antd';
import moment from 'moment';
import { Destination, Itinerary } from './listdest';

interface FormViewDestinationProps {
  destination: Destination;
  onClose: () => void;
}

const FormViewDestination: React.FC<FormViewDestinationProps> = ({ 
  destination, 
  onClose 
}) => {
  const [showItemDes, setShowItemDes] = useState<boolean>(false);

  const handleOpenItemDes = () => setShowItemDes(true);
  const handleCloseItemDes = () => setShowItemDes(false);

  const renderItineraries = (itineraries: Itinerary[]) => (
    <List
      itemLayout="vertical"
      dataSource={itineraries}
      renderItem={(itinerary) => (
        <List.Item key={itinerary.id}>
          <Typography.Title level={5}>Lịch trình #{itinerary.id}</Typography.Title>
          <p>
            <strong>Bắt đầu:</strong> {moment(itinerary.start_date).format('DD-MM-YYYY HH:mm')} <br />
            <strong>Kết thúc:</strong> {moment(itinerary.end_date).format('DD-MM-YYYY HH:mm')}
          </p>
          <List
            size="small"
            header={<strong>Hoạt động:</strong>}
            bordered
            dataSource={itinerary.activities}
            renderItem={(activity) => (
              <List.Item key={activity.id}>
                {activity.activity_name} ({moment(activity.start_time).format('HH:mm')} - {moment(activity.end_time).format('HH:mm')})
              </List.Item>
            )}
          />
        </List.Item>
      )}
    />
  );

  return (
    <>
      <Drawer
        title="Chi Tiết Điểm Đến"
        placement="right"
        onClose={onClose}
        open={true}
        className="destlist-view-drawer"
        width={600}
      >
        <Descriptions bordered column={1} className="destlist-view-details">
          <Descriptions.Item label="ID">{destination.id}</Descriptions.Item>
          <Descriptions.Item label="Tên Điểm Đến">{destination.name}</Descriptions.Item>
          <Descriptions.Item label="Mô Tả">
            {destination.description || 'Không có mô tả'}
          </Descriptions.Item>
          <Descriptions.Item label="Địa Điểm">{destination.location}</Descriptions.Item>
          <Descriptions.Item label="Loại">
            {destination.type === 'DOMESTIC' ? 'Trong Nước' : 'Quốc Tế'}
          </Descriptions.Item>
          <Descriptions.Item label="Thành phố">{destination.city.province.name}</Descriptions.Item>
        </Descriptions>

        <Typography.Title level={4} style={{ marginTop: 20 }}>
          Lịch Trình
        </Typography.Title>
        {destination.itineraries.length > 0 ? (
          renderItineraries(destination.itineraries)
        ) : (
          <p>Không có lịch trình</p>
        )}
      </Drawer>
    </>
  );
};

export default FormViewDestination;
