import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';


interface Destination {
  id: number;
  name: string;
  description: string;
  descriptionFile: string;
  location: string;
  created_at: string;
  destinationImages: string[];
}

const TourDetail: React.FC = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [destination, setDestination] = useState<Destination | null>(null);

  useEffect(() => {
    if (id) {
      axiosInstance.get(`/api/dest/list/${id}`)
        .then((response) => {
          setDestination(response.data);
        })
        .catch((error) => {
          console.error('Error fetching the tour details:', error);
        });
    }
  }, [id]);

  if (!destination) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{destination.name}</h1>
      <p>{destination.description}</p>
      <p><strong>Địa điểm:</strong> {destination.location}</p>
      <p><strong>Ngày tạo:</strong> {new Date(destination.created_at).toLocaleDateString()}</p>
      <div>
        <h3>Ảnh Tour:</h3>
        {destination.destinationImages.map((image, index) => (
          <img key={index} src={image} alt={`Tour Image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default TourDetail;
