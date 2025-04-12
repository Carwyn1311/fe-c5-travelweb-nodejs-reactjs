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

const DestinationCards: React.FC<DestinationCardsProps> = ({ destinations, current, pageSize, onPageChange }) => {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const startIndex = (current - 1) * pageSize;
  const currentDestinations = destinations.slice(startIndex, startIndex + pageSize);

  const handleCardClick = (id: number) => {
    navigate(`/destination/${id}`);
  };

  return (
    <div className="destination-cards-container">
      <div className="destination-cards">
        {currentDestinations.map((destination, index) => (
          <div key={index} className="destination-card" onClick={() => handleCardClick(destination.id)}>
            <div className="image-container">
              {destination.destinationImages.length > 0 && (
                <img
                  src={`${baseUrl}${destination.destinationImages[0].image_url}`}
                  alt={destination.name}
                  className="destination-image"
                />
              )}
            </div>
            <div className="destination-content">
              <h3 className="destination-title">{destination.name}</h3>
              <p className="destination-description">{destination.description}</p>
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
