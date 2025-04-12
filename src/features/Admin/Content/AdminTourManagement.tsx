import React from 'react';
import TourManager from '../../TourSlider/Content/TourManager';
import TourSlider from '../../TourSlider/Content/TourSlider';
import MenuSlider from '../../ImageSlider/Content/MenuSlider';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  price: string;
}

const AdminTourManagement: React.FC = () => {
  
  const [slides, setSlides] = React.useState<Slide[]>([
    { image: 'image1.jpg', title: 'Slide 1', subtitle: 'Subtitle 1', price: '$100' },
    { image: 'image2.jpg', title: 'Slide 2', subtitle: 'Subtitle 2', price: '$200' },
  ]);

  const handleUpdateSlides = (updatedSlides: Slide[]) => {
    setSlides(updatedSlides);
    localStorage.setItem('slides', JSON.stringify(updatedSlides)); // Lưu vào localStorage
  };

  return (
      <div className="admin-tour-management">
        <h1>Quản Lý Tour</h1>

        {/* Quản lý tour: thêm, xóa */}
        <TourManager />
        <div className="preview-section">
          <h2>Xem trước tour</h2>
          <MenuSlider slides={slides} onUpdateSlides={handleUpdateSlides} />
          <TourManager></TourManager>
        </div>
      </div>
  );
};

export default AdminTourManagement;
