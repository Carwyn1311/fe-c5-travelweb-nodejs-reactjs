// Định nghĩa interface Tour với destinationImages là mảng các chuỗi (string[])
export interface Tour {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  price: string;
  discount: string;
  duration: string;
  url: string;
  destinationImages: string[]; // URL ảnh cho tour
}

// Mảng tours với thuộc tính destinationImages được thêm vào mỗi đối tượng
export const tours: Tour[] = [
  {
    id: 1,
    image: '/images/ha-long-1.jpg',
    title: 'Tour Vịnh Hạ Long',
    subtitle: 'Vịnh Hạ Long là một di sản thiên nhiên thế giới được UNESCO công nhận, nổi tiếng với hàng ngàn hòn đảo đá vôi tuyệt đẹp và các hang động kỳ thú. ',
    price: '7.000.000đ',
    discount: '15%',
    duration: '7 ngày',
    url: '/destination/143',
    destinationImages: [
      '/images/ha-long-1.jpg',
      '/images/ha-long-2.jpg',
      '/images/ha-long-3.jpg',
    ],
  },
  {
    id: 2,
    image: '/images/Tokyo_japan.jpg',
    title: 'Tour Tokyo - Nhật Bản',
    subtitle: 'Thủ đô của Nhật Bản, nổi tiếng với sự kết hợp giữa văn hóa truyền thống và hiện đại.',
    price: '20.000.000đ',
    discount: '10%',
    duration: '5 ngày',
    url: '/destination/182',
    destinationImages: [
      '/images/Tokyo_japan.jpg',
      '/images/Tokyo_japan_2.jpg',
      '/images/Tokyo_japan_3.jpg',
    ],
  },
  {
    id: 3,
    image: '/images/img-busan.jpg',
    title: 'Tour Busan - Hàn Quốc',
    subtitle: 'Thành phố cảng lớn thứ hai của Hàn Quốc, nổi tiếng với bãi biển đẹp và hải sản tươi ngon.',
    price: '15.999.000đ',
    discount: '20%',
    duration: '10 ngày',
    url: '/destination/183',
    destinationImages: [
      '/images/america.jpg',
      '/images/america_2.jpg',
      '/images/america_3.jpg',
    ],
  },
  {
    id: 4,
    image: '/images/img-chuabaidinh.png',
    title: 'Chùa Bái Đính',
    subtitle: 'Chùa Bái Đính là một trong những quần thể chùa lớn nhất Việt Nam với kiến trúc độc đáo và không gian yên bình.',
    price: '4.999.000đ',
    discount: '18%',
    duration: '6 ngày',
    url: '/destination/142',
    destinationImages: [
      '/images/korea.jpg',
      '/images/korea_2.jpg',
      '/images/korea_3.jpg',
    ],
  },
  {
    id: 5,
    image: '/images/Paris.jpg',
    title: 'Tour Du Lịch Pháp',
    subtitle: 'Thủ đô của Pháp, được biết đến với biệt danh "Kinh đô ánh sáng" và vẻ đẹp lãng mạn.',
    price: '50.000.000đ',
    discount: '12%',
    duration: '9 ngày',
    url: '/destination/184',
    destinationImages: [
      '/images/Paris.jpg',
      '/images/Paris_2.jpg',
      '/images/Paris_3.jpg',
    ],
  },
  {
    id: 6,
    image: '/images/TrungQuoc-1.jpg',
    title: 'Tour Du Lịch Thăm Quyến - Trung Quốc',
    subtitle: 'Thành phố hiện đại và năng động của Trung Quốc, nổi tiếng với các khu công nghệ cao.',
    price: '20.000.000đ',
    discount: '12%',
    duration: '9 ngày',
    url: '/destination/185',
    destinationImages: [
      '/images/TrungQuoc-1.jpg',
      '/images/TrungQuoc-2.jpg',
      '/images/TrungQuoc-3.jpg',
    ],
  },
];
