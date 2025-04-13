import React from 'react';
import { Pagination } from 'antd';
import { Destination } from './DestinationTypes';
import { useNavigate } from 'react-router-dom';

interface DestinationCardsProps {
  destinations: Destination[];
  current: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const DestinationCards: React.FC<DestinationCardsProps> = ({
  destinations,
  current,
  pageSize,
  onPageChange,
}) => {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL || '';

  const startIndex = (current - 1) * pageSize;
  const currentDestinations = destinations.slice(startIndex, startIndex + pageSize);

  const handleCardClick = (id: string) => {
    navigate(`/destinations/${id}`);
  };

  return (
    <div className="destination-cards-container">
      <div className="destination-cards">
        {currentDestinations.map((destination) => (
          <div
            key={destination._id}
            className="destination-card"
            onClick={() => handleCardClick(destination._id!)}
          >
            <div className="image-container">
              {destination.destination_images?.length ? (
                <img
                  src={`${baseUrl}${destination.destination_images[0].image_url}`}
                  alt={destination.name}
                  className="destination-image"
                />
              ) : destination.image ? (
                <img src={destination.image} alt={destination.name} className="destination-image" />
              ) : (
                <p>Không có hình ảnh</p>
              )}
            </div>
            <div className="destination-content">
              <h3 className="destination-title">{destination.name}</h3>
              <p className="destination-description">{destination.description || 'Không có mô tả'}</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        current={current}
        pageSize={pageSize}
        total={destinations.length}
        onChange={onPageChange}
        className="destination-pagination"
      />
    </div>
  );
};

export default DestinationCards;