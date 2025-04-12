import React from 'react';
import { Card, Timeline } from 'antd';
import moment from 'moment';
import { Itinerary } from '../Content/DestinationTypes';

interface ItineraryCardProps {
  itineraries: Itinerary[];
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({ itineraries }) => {
  return (
    <>
      {itineraries.map((itinerary, index) => (
        <Card key={index} title={`Hành trình từ ${moment(itinerary.start_date).format('DD/MM/YYYY HH:mm')} đến ${moment(itinerary.end_date).format('DD/MM/YYYY HH:mm')}`} style={{ marginBottom: '20px' }}>
          <Timeline>
            {itinerary.activities.map((activity, idx) => (
              <Timeline.Item key={idx}>
                <p><strong>Hoạt động:</strong> {activity.activity_name}</p>
                <p><strong>Thời gian bắt đầu:</strong> {moment(activity.start_time).format('DD/MM/YYYY HH:mm')}</p>
                <p><strong>Thời gian kết thúc:</strong> {moment(activity.end_time).format('DD/MM/YYYY HH:mm')}</p>
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>
      ))}
    </>
  );
};

export default ItineraryCard;
