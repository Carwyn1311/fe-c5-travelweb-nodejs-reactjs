import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import { message } from 'antd';
import moment from 'moment';
import ItineraryCard from '../components/ItineraryCard';
import ImageGallery from '../components/ImageGallery';
import TicketSection from '../components/TicketSection';
import LikeSection from '../components/LikeSection';
import CommentsSection from '../components/CommentsSection';
import axiosInstanceToken from '../../AxiosInterceptor/Content/axioslnterceptorToken';
import '../css/DestDetail.css';
import { Destination } from './DestinationTypes';
import BookingModal from '../components/BookingModalProps';

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [bookingDate, setBookingDate] = useState<string>(moment().format("YYYY-MM-DDTHH:mm:ss.SSS"));
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [days, setDays] = useState<number>(1);
  const [comments, setComments] = useState<{ comment: string, rating: number | undefined, fullname: string }[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [newRating, setNewRating] = useState<number | undefined>(undefined);
  const [liked, setLiked] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axiosInstance.get(`/api/dest/${id}`);
        setDestination(response.data);
      } catch (error) {
        message.error('Không thể tải chi tiết điểm đến');
      }
    };

    fetchDestination();
  }, [id]);

  useEffect(() => {
    if (destination && destination.reviewsList) {
      const initialComments = destination.reviewsList.map(review => ({
        comment: review.comment,
        rating: review.rating,
        fullname: review.user.fullname,
      }));
      setComments(initialComments);
    }
  }, [destination]);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await axiosInstanceToken.get(`/api/wish/check/${id}`);
        setLiked(response.data.liked);
      } catch (error) {
        message.error('Không thể kiểm tra trạng thái yêu thích');
      }
    };

    checkIfLiked();
  }, [id]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (!destination) return;
    const bookingData = {
      booking_date: moment(bookingDate).format("YYYY-MM-DDTHH:mm:ss.SSS"),
      adult_tickets: adultCount,
      child_tickets: childCount,
      status: 'PENDING',
      days: days,
      destination_id: destination?.id,
      ticketPrice: destination?.ticketPrice,
    };

    try {
      const response = await axiosInstanceToken.post('/api/bookings/create', bookingData);
      const createdBooking = response.data;
      const bookingId = createdBooking.id;

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

  const handleLike = async () => {
    try {
      const destinationId = Number(id);
      const destinationData = { destinationId };
      console.log('Sending Data:', destinationData);

      if (liked) {
        console.log('Making DELETE request to /api/wish/delete/' + id);
        await axiosInstanceToken.delete(`/api/wish/delete/${destinationId}`);
        message.success('Đã bỏ yêu thích');
      } else {
        console.log('Making POST request to /api/wish/create');
        await axiosInstanceToken.post('/api/wish/create', destinationData);
        message.success('Đã yêu thích');
      }
      setLiked(!liked);
    } catch (error) {
      message.error('Không thể cập nhật trạng thái yêu thích');
    }
  };

  const handleAddComment = async () => {
    if (newComment || newRating !== undefined) {
      const commentData = {
        comment: newComment,
        rating: newRating,
        destinationId: Number(id),
      };

      try {
        await axiosInstanceToken.post('/api/review/create', commentData);
        setComments([...comments, { comment: newComment, rating: newRating, fullname: 'Current User' }]);
        setNewComment('');
        setNewRating(undefined);
        message.success('Bình luận đã được thêm');
      } catch (error) {
        message.error('Không thể thêm bình luận');
      }
    }
  };

  if (!destination) {
    return <div>Loading...</div>;
  }

  const typeDisplay = destination.type === 'DOMESTIC' ? 'Trong nước' : 'Ngoài nước';

  return (
    <div className="destination-detail">
      <div className="left-column">
        <h2 style={{padding: '10px', marginLeft: '20px'}}>Lịch trình Tour</h2>
        <ItineraryCard itineraries={destination.itineraries} />
      </div>

      <div className="right-column">
        <h1>{destination.name}</h1>
        <p>{destination.description}</p>
        <ImageGallery images={destination.destinationImages} />

        <div className="dest-detail-additional-info">
  <h2 className="dest-detail-title">Thông tin chi tiết</h2>
  <p className="dest-detail-info">
    <strong>Địa điểm:</strong> {destination.location}
  </p>
  <p className="dest-detail-info">
    <strong>Loại:</strong> {typeDisplay}
  </p>
  <p className="dest-detail-info">
    <strong>Tỉnh/Thành phố:</strong> {destination.city.name}
  </p>
  <p className="dest-detail-info">
    <strong>Tỉnh:</strong> {destination.city.province.name}
  </p>
  <p className="dest-detail-info">
    <strong>Quốc gia:</strong> {destination.city.province.country}
  </p>
</div>


        <TicketSection
          bookingDate={bookingDate}
          setBookingDate={setBookingDate}
          adultCount={adultCount}
          setAdultCount={setAdultCount}
          childCount={childCount}
          setChildCount={setChildCount}
          days={days}
          setDays={setDays}
          handleBookNow={showModal}
          ticketPrice={destination.ticketPrice}
        />

        <LikeSection liked={liked} handleLike={handleLike} />

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
        destination={destination}
      />
    </div>
  );
};

export default DestinationDetail;
