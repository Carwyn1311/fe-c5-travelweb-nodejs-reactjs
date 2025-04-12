import { AiFillCaretRight } from "react-icons/ai"; 
import { AiFillCaretLeft } from "react-icons/ai"; 
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { ImgSliderContext } from './ImgSliderContext';  // Import context
import Button from '../../../components/Button/Button';  // Giả sử bạn đã có một Button component
import '../css/ImageSlider.css';  // Giả sử bạn có file CSS để tạo kiểu cho slider

const ImageSlider: React.FC = React.memo(() => {
  const { slides } = useContext(ImgSliderContext);  // Lấy dữ liệu slides từ context
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showTextOverlay, setShowTextOverlay] = useState(false);

  // Hàm chuyển sang slide tiếp theo
  const goToNextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setShowTextOverlay(false);  // Ẩn overlay khi chuyển slide
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);  // Chuyển đến slide tiếp theo
  }, [slides]);

  // Hàm quay lại slide trước
  const goToPreviousSlide = useCallback(() => {
    if (slides.length === 0) return;
    setShowTextOverlay(false);  // Ẩn overlay khi quay lại slide trước
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);  // Quay lại slide trước
  }, [slides]);

  // Hàm chuyển đến slide cụ thể
  const goToSlide = (index: number) => {
    if (slides.length === 0) return;
    setShowTextOverlay(false);
    setCurrentSlide(index);  // Chuyển đến slide theo index
  };

  // Hook useEffect để tự động chuyển slide sau mỗi 5 giây
  useEffect(() => {
    if (slides.length === 0) return;
    
    const textOverlayTimeout = setTimeout(() => setShowTextOverlay(true), 500);
    const interval = setInterval(goToNextSlide, 5000);  // Chuyển slide sau mỗi 5 giây

    return () => {
      clearInterval(interval);  // Dọn dẹp interval khi component unmount
      clearTimeout(textOverlayTimeout);  // Dọn dẹp timeout
    };
  }, [goToNextSlide, slides]);

  const currentSlideData = slides[currentSlide];
  
  if (!currentSlideData) {
    return <div>Loading...</div>;  // Hiển thị loading nếu chưa có slide
  }

  return (
    <section 
      className="slider-container" 
      style={{ backgroundImage: `url(${currentSlideData.image})` }}
    >
      <div className={`slider-overlay ${showTextOverlay ? 'show' : ''}`}>
        <h2 className="slider-title">{currentSlideData.title}</h2>
        <h1 className="slider-subtitle">{currentSlideData.subtitle}</h1>
        <p className="slider-price">{currentSlideData.price}</p>
        <button className="slider-button">XEM THÊM</button>
      </div>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}  // Chuyển đến slide khi click vào dot
          />
        ))}
      </div>

      <Button className="slider-nav-button-left" onClick={goToPreviousSlide}>
        <span className="material-icons"> <AiFillCaretLeft /> </span>
      </Button>
      <Button className="slider-nav-button-right" onClick={goToNextSlide}>
        <span className="material-icons"> <AiFillCaretRight /> </span>
      </Button>
    </section>
  );
});

export default ImageSlider;
