import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import { message } from 'antd';
import moment from 'moment';
import ItineraryCard from '../components/ItineraryCard';
import ImageGallery from '../components/ImageGallery';
import CommentsSection from '../components/CommentsSection';
import BookingModal from '../components/BookingModalProps';
import '../css/DestDetail.css';
import { Destination, DestinationImg } from './DestinationTypes';
import { axiosNoToken } from '../../AxiosInterceptor/Content/axiosNotoken';

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [bookingDate, setBookingDate] = useState<string>(moment().format('YYYY-MM-DDTHH:mm:ss.SSS'));
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [days, setDays] = useState<number>(1);
  const [comments, setComments] = useState<{ comment: string; rating: number | undefined; fullname: string }[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [newRating, setNewRating] = useState<number | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axiosNoToken.get(`/destinations/${id}`);
        if (response.data) {
          setDestination(response.data);
        } else {
          message.error('Không tìm thấy dữ liệu điểm đến');
        }
      } catch (error) {
        message.error('Không thể tải chi tiết điểm đến');
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axiosNoToken.get(`/reviews/destination/${id}`);
        if (response.data && Array.isArray(response.data)) {
          setComments(
            response.data.map((review: any) => ({
              comment: review.comment || '',
              rating: review.rating,
              fullname: review.user?.fullname || 'Khách',
            }))
          );
        }
      } catch (error) {
        console.error('Lỗi khi lấy đánh giá:', error);
      }
    };

    fetchDestination();
    fetchReviews();
  }, [id]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (!destination) return;
    const bookingData = {
      booking_date: moment(bookingDate).format('YYYY-MM-DDTHH:mm:ss.SSS'),
      adult_tickets: adultCount,
      child_tickets: childCount,
      status: 'PENDING',
      days: days,
      destination_id: destination._id,
      ticketPrice: {
        adult_price: destination.adult_price || 0,
        child_price: destination.child_price || 0,
      },
    };

    try {
      const response = await axiosInstance.post('/bookings', bookingData);
      const createdBooking = response.data;
      const bookingId = createdBooking._id || createdBooking.id;
      message.success('Đặt vé thành công!');
      navigate('/payment', { state: { ...bookingData, bookingId, destination } });
    } catch (error) {
      message.error('Đặt vé thất bại.');
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddComment = async () => {
    if (!newComment && newRating === undefined) return;

    const commentData = {
      comment: newComment,
      rating: newRating,
      destination_id: id,
    };

    try {
      await axiosInstance.post('/reviews', commentData);
      setComments([...comments, { comment: newComment, rating: newRating, fullname: 'Current User' }]);
      setNewComment('');
      setNewRating(undefined);
      message.success('Bình luận đã được thêm');
    } catch (error) {
      message.error('Không thể thêm bình luận');
    }
  };

  if (!destination) {
    return <div>Loading...</div>;
  }

  const cityName = destination.city_id?.name || 'Không có dữ liệu';
  const provinceName = destination.province_id?.name || 'Không có dữ liệu';
  const countryName = destination.province_id?.country || 'Không có dữ liệu';
  const typeDisplay = destination.province_id?.country === 'Vietnam' ? 'Trong nước' : 'Quốc tế';

  return (
    <div className="destination-detail">
      <div className="left-column">
        <h2 style={{ padding: '10px', marginLeft: '20px' }}>Lịch trình Tour</h2>
        {destination.itineraries?.length ? (
          <ItineraryCard itineraries={destination.itineraries} />
        ) : (
          <p>Chưa có lịch trình nào.</p>
        )}
      </div>

      <div className="right-column">
        <h1>{destination.name}</h1>
        <p>{destination.description || 'Không có mô tả.'}</p>
        {destination.destination_images?.length ? (
          <ImageGallery
            images={destination.destination_images.map((img: DestinationImg) => ({
              ...img,
              id: img._id || img.image_url,
              destination_id: img.destination_id,
            }))}
          />
        ) : destination.image && destination._id ? (
          <ImageGallery images={[{ image_url: destination.image, destination_id: destination._id }]} />
        ) : (
          <p>Không có hình ảnh.</p>
        )}

        <div className="dest-detail-additional-info">
          <h2 className="dest-detail-title">Thông tin chi tiết</h2>
          <p className="dest-detail-info">
            <strong>Địa điểm:</strong> {destination.location || 'N/A'}
          </p>
          <p className="dest-detail-info">
            <strong>Loại:</strong> {typeDisplay}
          </p>
          <p className="dest-detail-info">
            <strong>Tỉnh/Thành phố:</strong> {cityName}
          </p>
          <p className="dest-detail-info">
            <strong>Tỉnh:</strong> {provinceName}
          </p>
          <p className="dest-detail-info">
            <strong>Quốc gia:</strong> {countryName}
          </p>
        </div>

        <CommentsSection
          comments={comments}
          newComment={newComment}
          setNewComment={setNewComment}
          newRating={newRating}
          setNewRating={setNewRating}
          handleAddComment={handleAddComment}
        />
      </div>

      <BookingModal
        isVisible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        bookingDate={bookingDate}
        adultCount={adultCount}
        childCount={childCount}
        days={days}
        destination={{
          ...destination,
          ticketPrice: {
            adult_price: destination.adult_price || 0,
            child_price: destination.child_price || 0,
          },
        }}
      />
    </div>
  );
};

export default DestinationDetail;