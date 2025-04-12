import React, { useState, useEffect } from 'react';
import { Destination, destinationList, fetchDestinations } from '../../Admin/Destination/listdest';
import TourItemFilter from './TourItemFilter';

const FormFilter: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchDestinations();
      setDestinations([...destinationList]); // Lấy danh sách điểm đến từ listdest
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Đang tải danh sách điểm đến...</p>;
  }

  return (
    <div className="tour-list">
      <div className="sort-bar">
        <span>Sắp xếp :</span>
        <a href="#" className="active">[ Ngày gần nhất ]</a>
        <a href="#">[ Giá thấp nhất ]</a>
        <a href="#">[ Hấp dẫn nhất ]</a>
      </div>
      <div className="tours">
        {destinations.map((destination) => (
          <TourItemFilter key={destination.id} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default FormFilter;
