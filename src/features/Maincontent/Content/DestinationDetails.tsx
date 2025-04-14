import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosNoToken } from '../../AxiosInterceptor/Content/axiosNotoken';
import { axiosToken } from '../../AxiosInterceptor/Content/axiosToken';
import { message, Button } from 'antd';
import moment from 'moment';
import ItineraryCard from '../components/ItineraryCard';
import ImageGallery from '../components/ImageGallery';
import CommentsSection from '../components/CommentsSection';
import BookingModal from '../components/BookingModalProps';
import '../css/DestDetail.css';
import { Destination, DestinationImg } from './DestinationTypes';

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [bookingDate, setBookingDate] = useState<string>(
    moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
  );
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [days, setDays] = useState<number>(1);
  const [comments, setComments] = useState<
    { comment: string; rating: number | undefined; fullname: string }[]
  >([]);
  const [newComment, setNewComment] = useState<string>('');
  const [newRating, setNewRating] = useState<number | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axiosNoToken.get(`/destinations/${id}`);
        if (response.data && response.data.success) {
          setDestination(response.data.data);
          if (response.data.data.days) {
            setDays(response.data.data.days);
          }
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
  }, [id]);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axiosNoToken.get(`/itineraries/destination/${id}`);
        if (response.data && response.data.success) {
          setItineraries(response.data.data);
        } else {
          message.error('Không tìm thấy lịch trình cho điểm đến này');
        }
      } catch (error) {
        message.error('Lỗi khi tải lịch trình');
      }
    };

    if (id) {
      fetchItineraries();
    }
  }, [id]);

  useEffect(() => {
    if (!destination) return;

    const destinationId = destination._id;
    const provinceId =
      (destination.province_id && (destination.province_id as any)._id) ||
      destination.province_id;
    const cityId =
      (destination.city_id && (destination.city_id as any)._id) ||
      destination.city_id;
    const itineraryId = itineraries.length ? itineraries[0]._id : null;
    const payload = { imageUrl: destination.image || '' };

    if (itineraryId) {
      axiosToken
        .get(`/activities/itinerary/${itineraryId}`)
        .then((response: any) => {
          console.log('Activities theo itinerary:', response.data);
        })
        .catch((error: any) => {
          console.error('Lỗi lấy activities theo itinerary:', error);
        });
    }

    axiosToken
      .get(`/activities/${destinationId}`)
      .then((response: any) => {
        console.log('Activities theo id:', response.data);
      })
      .catch((error: any) => {
        console.error('Lỗi lấy activities:', error);
      });

    if (provinceId) {
      axiosNoToken
        .get(`/cities/province/${provinceId}`)
        .then((response: any) => {
          console.log('Danh sách thành phố theo province:', response.data);
        })
        .catch((error: any) => {
          console.error('Lỗi lấy cities theo province:', error);
        });
    }

    axiosNoToken
      .post(`/destinationImages/url/${destinationId}`, payload)
      .then((response: any) => {
        console.log('Kết quả post destinationImages url:', response.data);
      })
      .catch((error: any) => {
        console.error('Lỗi khi post destinationImages url:', error);
      });

    axiosNoToken
      .get(`/destinationImages/destination/${destinationId}`)
      .then((response: any) => {
        console.log('Danh sách hình ảnh của destination:', response.data);
      })
      .catch((error: any) => {
        console.error('Lỗi lấy destinationImages:', error);
      });

    if (provinceId) {
      axiosNoToken
        .get(`/destinations/province/${provinceId}`)
        .then(({ data }: any) => {
          console.log('Destinations theo province:', data);
        })
        .catch((error: any) => {
          console.error('Lỗi lấy destinations theo province:', error);
        });
    }

    if (cityId) {
      axiosNoToken
        .get(`/destinations/city/${cityId}`)
        .then(({ data }: any) => {
          console.log('Destinations theo city:', data);
        })
        .catch((error: any) => {
          console.error('Lỗi lấy destinations theo city:', error);
        });
    }

    axiosToken
      .get(`/reviews/destination/${destinationId}`)
      .then((response: any) => {
        console.log('Đánh giá từ axiosToken:', response.data);
      })
      .catch((error: any) => {
        console.error('Lỗi lấy reviews với axiosToken:', error);
      });
  }, [destination, itineraries]);

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
      destination_id: destination._id, // Ensure this matches backend expectations
    };

    try {
      const response = await axiosToken.post('/bookings', bookingData);
      if (response.data && response.data.success) {
        const createdBooking = response.data.data;
        const bookingId = createdBooking._id || createdBooking.id;
        message.success('Đặt vé thành công!');
        navigate('/payment', { state: { ...bookingData, bookingId, destination } });
      } else {
        message.error('Đặt vé thất bại: Phản hồi không hợp lệ từ server.');
      }
    } catch (error: any) {
      console.error('Booking error:', error.response?.data || error.message);
      message.error(
        error.response?.data?.message || 'Đặt vé thất bại. Vui lòng kiểm tra lại.'
      );
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
      const response = await axiosToken.post('/reviews', commentData);
      if (response.data && response.data.success) {
        setComments([...comments, { comment: newComment, rating: newRating, fullname: 'Current User' }]);
        setNewComment('');
        setNewRating(undefined);
        message.success('Bình luận đã được thêm');
      } else {
        message.error('Không thể thêm bình luận: Phản hồi không hợp lệ.');
      }
    } catch (error: any) {
      console.error('Comment error:', error.response?.data || error.message);
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
        {itineraries.length ? (
          <ItineraryCard itineraries={itineraries} />
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
          <ImageGallery
            images={[{ image_url: destination.image, destination_id: destination._id }]}
          />
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
          <p className="dest-detail-info">
            <strong>Giá vé người lớn:</strong> {(destination.adult_price || 0).toLocaleString()} VND
          </p>
          <p className="dest-detail-info">
            <strong>Giá vé trẻ em:</strong> {(destination.child_price ?? 0).toLocaleString()} VND
          </p>
          <p className="dest-detail-info">
            <strong>Số ngày tour:</strong> {destination.days || days} ngày
          </p>
          <p className="dest-detail-info">
            <strong>Ngày tạo:</strong> {moment(destination.createdAt).format('DD/MM/YYYY HH:mm:ss')}
          </p>
          <p className="dest-detail-info">
            <strong>Ngày cập nhật:</strong> {moment(destination.updatedAt).format('DD/MM/YYYY HH:mm:ss')}
          </p>
        </div>

        <Button type="primary" onClick={showModal} style={{ marginTop: '20px' }}>
          Đặt vé - Người lớn: {(destination.adult_price || 0).toLocaleString()} VND, Trẻ em: {(destination.child_price || 0).toLocaleString()} VND, {destination.days || days} ngày
        </Button>

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