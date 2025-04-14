// src/features/Maincontent/Content/DestinationDetails.tsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosNoToken } from '../../AxiosInterceptor/Content/axiosNotoken';
import { axiosToken } from '../../AxiosInterceptor/Content/axiosToken';
import moment from 'moment';
import { Box, Paper, Typography, Button, TextField, Stack } from '@mui/material';
import ItineraryCard from '../components/ItineraryCard';
import CommentsSection from '../components/CommentsSection';
import BookingModal from '../components/BookingModalProps';
import '../css/DestDetail.css';
import { Destination } from './DestinationTypes';
import { AuthContext } from '../Payment/AuthContext';

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [bookingDate, setBookingDate] = useState<string>(moment().format('YYYY-MM-DDTHH:mm:ss.SSS'));
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [days, setDays] = useState<number>(1);
  const [comments, setComments] = useState<{ comment: string; rating: number | undefined; fullname: string }[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [newRating, setNewRating] = useState<number | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(true);
  const [alertCountdown, setAlertCountdown] = useState<number>(6);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const tokenHeader = user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
  const baseUrl = process.env.REACT_APP_BASE_URL || '';

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axiosNoToken.get(`/destinations/${id}`);
        if (response.data && response.data.success) {
          setDestination(response.data.data);
          if (response.data.data.days) setDays(response.data.data.days);
        } else {
          console.error(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const fetchReviews = async () => {
      try {
        const response = await axiosToken.get(`/reviews/destination/${id}`, { headers: tokenHeader });
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          setComments(
            response.data.data.map((review: any) => ({
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
  }, [id, tokenHeader]);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axiosNoToken.get(`/destinations/${id}`);
        if (response.data && response.data.success) {
          setDestination(response.data.data);
          if (response.data.data.days) setDays(response.data.data.days);
          else setDays(1);  // Ensure default is set to 1 if not available in the response
        } else {
          console.error(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDestination();
  }, [id]);
  

  useEffect(() => {
    if (showAlert) {
      const interval = setInterval(() => {
        setAlertCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowAlert(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showAlert]);

  const showModal = () => {
    if (!destination?._id) {
      console.error('Thiếu ID điểm đến.');
      return;
    }
    setIsModalVisible(true);
  };

  const handleOk = async (bookingData: any) => {
    if (!destination?._id) return;
    const adultPrice = destination.adult_price ?? 0;
    const childPrice = destination.child_price ?? 0;
    const tripDays = days;
    const totalPrice =
      (bookingData.adult_tickets * adultPrice + bookingData.child_tickets * childPrice) * tripDays;
    const fullBookingData = {
      ...bookingData,
      user_id: user ? user.id : '',
      status: 'PENDING',
      days: tripDays,
      destination_id: destination._id,
      total_price: totalPrice,
    };
    try {
      const response = await axiosToken.post('/bookings', fullBookingData, { headers: tokenHeader });
      if (response.data && response.data.success) {
        const createdBooking = response.data.data;
        const bookingId = createdBooking._id || createdBooking.id;
        navigate('/payment', {
          state: {
            ...fullBookingData,
            days: tripDays,
            bookingId,
            destination,
            ticketPrice: { adult_price: adultPrice, child_price: childPrice },
            totalPrice,
          },
        });
      }
    } catch (error: any) {
      console.error('Booking error:', error.response?.data || error.message);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddComment = async () => {
    if (!newComment && newRating === undefined) return;
    const commentData = { comment: newComment, rating: newRating, destination_id: id };
    try {
      const response = await axiosToken.post('/reviews', commentData, { headers: tokenHeader });
      if (response.data && response.data.success) {
        setComments([...comments, { comment: newComment, rating: newRating, fullname: 'Current User' }]);
        setNewComment('');
        setNewRating(undefined);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  if (!destination) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  const cityName = destination.city_id?.name || 'Không có dữ liệu';
  const provinceName = destination.province_id?.name || 'Không có dữ liệu';
  const countryName = destination.province_id?.country || 'Không có dữ liệu';
  const typeDisplay = destination.province_id?.country === 'Vietnam' ? 'Trong nước' : 'Quốc tế';
  const displayAdultPrice = destination.adult_price ?? 0;
  const displayChildPrice = destination.child_price ?? 0;
  const displayDays = destination.days ?? days;

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Paper sx={{ flex: 2, p: 2, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Lịch trình Tour
          </Typography>
          {itineraries.length ? (
            <ItineraryCard itineraries={itineraries} />
          ) : (
            <Typography variant="body2">Chưa có lịch trình nào.</Typography>
          )}
        </Paper>
        <Paper sx={{ flex: 3, p: 2, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            {destination.name || 'Không có tên'}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {destination.description || 'Không có mô tả.'}
          </Typography>
          <div className="image-container">
            {destination.destination_images?.length ? (
              <img
                src={`${baseUrl}${destination.destination_images[0].image_url}`}
                alt={destination.name}
                className="destination-image"
              />
            ) : destination.image ? (
              <img
                src={destination.image}
                alt={destination.name}
                className="destination-image"
              />
            ) : (
              <Typography variant="body2">Không có hình ảnh</Typography>
            )}
          </div>
          {showAlert && (
            <Typography variant="subtitle1" color="primary" sx={{ mt: 2 }}>
              Nhớ kiểm tra điện thoại của quý khách trong thời gian chờ nhân viên CSKH gọi xác nhận ({alertCountdown}s)
            </Typography>
          )}
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Thông tin chi tiết
            </Typography>
            <Typography variant="body2">
              <strong>Địa điểm:</strong> {destination.location || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Loại:</strong> {typeDisplay}
            </Typography>
            <Typography variant="body2">
              <strong>Tỉnh/Thành phố:</strong> {cityName}
            </Typography>
            <Typography variant="body2">
              <strong>Tỉnh:</strong> {provinceName}
            </Typography>
            <Typography variant="body2">
              <strong>Quốc gia:</strong> {countryName}
            </Typography>
            <Typography variant="body2">
              <strong>Giá vé người lớn:</strong> {displayAdultPrice.toLocaleString()} VND
            </Typography>
            <Typography variant="body2">
              <strong>Giá vé trẻ em:</strong> {displayChildPrice.toLocaleString()} VND
            </Typography>
            <Typography variant="body2">
              <strong>Số ngày tour:</strong> {displayDays} ngày
            </Typography>
            <Typography variant="body2">
              <strong>Ngày tạo:</strong> {destination.createdAt ? moment(destination.createdAt).format('DD/MM/YYYY HH:mm:ss') : 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Ngày cập nhật:</strong> {destination.updatedAt ? moment(destination.updatedAt).format('DD/MM/YYYY HH:mm:ss') : 'N/A'}
            </Typography>
          </Box>
          <Stack spacing={2} direction="row" sx={{ my: 2 }} alignItems="center">
            <TextField
              label="Số vé người lớn"
              type="number"
              size="small"
              value={adultCount}
              onChange={(e) => setAdultCount(Number(e.target.value) || 1)}
              InputProps={{ inputProps: { min: 1 } }}
            />
            <TextField
              label="Số vé trẻ em"
              type="number"
              size="small"
              value={childCount}
              onChange={(e) => setChildCount(Number(e.target.value) || 0)}
              InputProps={{ inputProps: { min: 0 } }}
            />
            <TextField
              label="Số ngày tour"
              type="number"
              size="small"
              value={days}
              onChange={(e) => setDays(Number(e.target.value) || 1)}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Stack>
          <Button variant="contained" color="primary" onClick={showModal} fullWidth>
            Đặt vé - Người lớn: {displayAdultPrice.toLocaleString()} VND, Trẻ em: {displayChildPrice.toLocaleString()} VND, {displayDays} ngày
          </Button>
          <Box sx={{ mt: 3 }}>
            <CommentsSection
              comments={comments}
              newComment={newComment}
              setNewComment={setNewComment}
              newRating={newRating}
              setNewRating={setNewRating}
              handleAddComment={handleAddComment}
            />
          </Box>
        </Paper>
      </Stack>
      {destination._id && (
        <BookingModal
          isVisible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          bookingDate={bookingDate}
          adultCount={adultCount}
          childCount={childCount}
          days={displayDays}
          destination={{
            ...destination,
            _id: destination._id,
            ticketPrice: {
              adult_price: displayAdultPrice,
              child_price: displayChildPrice,
            },
          }}
        />
      )}
    </Box>
  );
};

export default DestinationDetail;
