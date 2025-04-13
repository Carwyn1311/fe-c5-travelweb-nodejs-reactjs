import React, { useState, useEffect } from 'react';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import { message } from 'antd';
import { Form, Input, Button } from 'antd';
import '../css/MainContent.css';
import { TourContextProvider } from '../../TourSlider/Content/TourContext';
import TourSlider from '../../TourSlider/Content/TourSlider';
import ImgTransition from '../../ImgTransition/Content/ImgTransition';
import AutoSearch from '../../../components/AutoSearchField/AutoSearch';
import { itemsWithUrls } from './Inputdata';
import Footer from '../../Footer/Content/Footer';
import CommitmentSection from '../../CommitmentSection/Content/CommitmentSection';
import ImageSlider from '../../ImageSlider/Content/ImageSlider';
import { ImgSliderContextProvider } from '../../ImageSlider/Content/ImgSliderContext';
import DestinationCards from './DestinationCards';  // Import DestinationCards component
import { Destination } from './DestinationTypes'; // Import các interface
import { fetchDestinations } from '../../Admin/Destination/listdest';

const MainContent: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [selectedUrl, setSelectedUrl] = useState<string>('');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6; // Giới hạn hiển thị 6 thẻ card mỗi trang

  // Handle item selection for navigation
  const handleSelectItem = (item: string, url: string) => {
    setSelectedItem(item);
    setSelectedUrl(url);
    console.log('Selected item:', item);
    console.log('Redirecting to:', url);
    window.location.href = url; // Điều hướng đến URL tương ứng
  };

  // Handle form submissions (for payment or tour)
  const handlePaymentSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
  };

  const handleTourSubmit = (values: any) => {
    console.log('Tour form submitted:', values);
  };

  // Handle pagination page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Fetch destinations from the API
  const loadDestinations = async () => {
      setLoading(true);
      try {
        const response = await fetchDestinations();  // Gọi hàm fetchDestinations để lấy dữ liệu
        console.log('Fetched destinations:', response.data);  // Kiểm tra dữ liệu trả về từ API
  
        // Kiểm tra xem API trả về đúng dữ liệu không
        if (response.success && Array.isArray(response.data)) {
          // Chuyển đổi dữ liệu nhận được sang định dạng đúng với DestinationTypes
          const formattedDestinations = response.data.map((dest: any) => ({
            ...dest,
            destination_images: dest.destination_images?.map((img: any) => ({
              ...img,
              id: img.id as React.Key
            }))
          }));
          // Cập nhật state destinations với mảng điểm đến được định dạng lại
          setDestinations(formattedDestinations);
        } else {
          message.error('Dữ liệu không hợp lệ');
        }
      } catch (error) {
        message.error('Không thể tải danh sách điểm đến');
      }
      setLoading(false);
    };
  
    useEffect(() => {
      loadDestinations();  // Gọi hàm để tải điểm đến khi component mount
    }, []);  // Chạy một lần khi component mount

  // Pagination logic: Slice the destinations array based on current page and page size
  const paginatedDestinations = destinations.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <ImgSliderContextProvider>
      <TourContextProvider>
        <div className="main-content">
          <div className="slider-display">
            <ImageSlider />
          </div>
          <div className="info-tour-new">
            <AutoSearch
              className="search-input"
              items={itemsWithUrls}
              onSelectItem={handleSelectItem}
              label="Search for Tour...."
              placeholder=""
              width="500px"
              height="70px"
            />
            <h2 className="info-tour-2025">TOUR DU LỊCH </h2>
            <div className="tour-slider">
              <TourSlider interval={4000} /> {/* Thời gian chuyển cảnh là 4 giây */}
            </div>
          </div>

          {/* Pass paginated destinations to DestinationCards */}
          <DestinationCards 
            destinations={paginatedDestinations}  // Pass paginated data here
            current={currentPage} 
            pageSize={pageSize} 
            onPageChange={handlePageChange}
          /> {/* Sử dụng DestinationCards component */}

          <div className="img-transition">
            <ImgTransition
              imageUrl="/images/ha-long-1.jpg"
              title="Đón 7 Chuyến Tàu Biển Quốc Tế"
              subtitle="Tin Nổi Bật"
              description="DPT đón và phục vụ hơn 20,600 du khách quốc tế đến Việt Nam từ tháng 11/2024."
              buttonText="Xem thêm"
              buttonUrl="https://www.saigontourist.net/vi/chi-tiet/668"
              position="left"
            />
          </div>
          <div className="content-bottom">
            <div className="commitment-section">
              <CommitmentSection />
            </div>
            <Footer />
          </div>
        </div>
      </TourContextProvider>
    </ImgSliderContextProvider>
  );
};

export default MainContent;
