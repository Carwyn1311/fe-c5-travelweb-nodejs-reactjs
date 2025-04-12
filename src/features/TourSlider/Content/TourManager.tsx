// TourManager.tsx
import React, { useContext, useState } from 'react';
import { TourContext } from './TourContext';
import '../.css/TourManager.css';
import { TextField } from '@mui/material';

const TourManager: React.FC = () => {
  const { tours } = useContext(TourContext) ?? { tours: [], addTour: () => {}, deleteTour: () => {} };
  const [newTour, setNewTour] = useState({
    image: '',
    discount: '',
    duration: '',
    price: '',
    title: '',
    subtitle: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTour((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTour = () => {
    setNewTour({ image: '', discount: '', duration: '', price: '', title: '', subtitle: '' });
  };

  return (
    <div className="tour-manager">
      <h2>Quản lý Tour</h2>
      <div className="tour-manager-form">
        <TextField
          label="Image URL"
          name="image"
          value={newTour.image}
          onChange={handleInputChange}
          placeholder="Nhập URL hình ảnh"
          className="tour-input"
        />
        <TextField
          label="Discount"
          name="discount"
          value={newTour.discount}
          onChange={handleInputChange}
          placeholder="Nhập giảm giá"
          className="tour-input"
        />
        <TextField
          label="Duration"
          name="duration"
          value={newTour.duration}
          onChange={handleInputChange}
          placeholder="Nhập thời gian"
          className="tour-input"
        />
        <TextField
          label="Price"
          name="price"
          value={newTour.price}
          onChange={handleInputChange}
          placeholder="Nhập giá"
          className="tour-input"
        />
        <TextField
          label="Title"
          name="title"
          value={newTour.title}
          onChange={handleInputChange}
          placeholder="Nhập tiêu đề"
          className="tour-input"
        />
        <TextField
          label="Subtitle"
          name="subtitle"
          value={newTour.subtitle}
          onChange={handleInputChange}
          placeholder="Nhập phụ đề"
          className="tour-input"
        />
        <button onClick={handleAddTour} className="add-tour-button">Thêm Tour</button>
      </div>

      <div className="tour-list">
        {tours.map((tour) => (
          <div key={tour.id} className="tour-item">
            <p>{tour.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourManager;
