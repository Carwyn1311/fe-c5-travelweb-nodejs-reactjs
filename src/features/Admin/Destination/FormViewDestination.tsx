import React from 'react';
import { Drawer, Descriptions, Typography, Image } from 'antd';
import moment from 'moment';
import { Destination } from './listdest';

interface FormViewDestinationProps {
  destination: Destination;
  onClose: () => void;
}

const FormViewDestination: React.FC<FormViewDestinationProps> = ({ 
  destination, 
  onClose 
}) => {
  return (
    <Drawer
      title="Chi Tiết Điểm Đến"
      placement="right"
      onClose={onClose}
      open={true}
      className="destlist-view-drawer"
      width={600}
    >
      <Descriptions bordered column={1} className="destlist-view-details">
        <Descriptions.Item label="ID">{destination._id}</Descriptions.Item>
        <Descriptions.Item label="Tên Điểm Đến">{destination.name}</Descriptions.Item>
        <Descriptions.Item label="Mô Tả">
          {destination.description || 'Không có mô tả'}
        </Descriptions.Item>
        <Descriptions.Item label="Địa Điểm">{destination.location}</Descriptions.Item>
        <Descriptions.Item label="Giá Người Lớn">
          {destination.adult_price != null ? `${destination.adult_price.toLocaleString()} VNĐ` : 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Giá Trẻ Em">
          {destination.child_price != null ? `${destination.child_price.toLocaleString()} VNĐ` : 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Số Ngày">{destination.days}</Descriptions.Item>
        
        {/* Fix for displaying province and city name */}
                <Descriptions.Item label="Tỉnh">
                  {destination.province_id && typeof destination.province_id === 'object'
                    ? (destination.province_id as { name: string }).name
                    : destination.province_id || 'Không có dữ liệu'}
                </Descriptions.Item>
        <Descriptions.Item label="Thành phố">
          {destination.city_id && typeof destination.city_id === 'object'
            ? (destination.city_id as { name: string }).name
            : destination.city_id || 'Không có dữ liệu'}
        </Descriptions.Item>
      </Descriptions>

      {/* Display images */}
      {destination.destination_images && destination.destination_images.length > 0 ? (
        <div style={{ marginTop: 20 }}>
          <Typography.Title level={4}>Hình Ảnh Điểm Đến</Typography.Title>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {destination.destination_images.map((image) => (
              <div key={image._id} style={{ margin: '0 10px 10px 0' }}>
                <Image
                  width={150}
                  src={image.image_url}
                  alt="destination image"
                  preview={false}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Không có hình ảnh</p>
      )}
    </Drawer>
  );
};

export default FormViewDestination;
