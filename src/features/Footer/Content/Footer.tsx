import React from "react";
import "../css/Footer.css"; // Import CSS file
import FooterCard from "./FooterCard";

const Footer: React.FC = () => {
  return (
    <footer className="footer-app">
      <div className="footer-wrapper" style={{ backgroundImage: 'url(/uploads/images/footer/background-web2024b.jpg)', backgroundRepeat: 'no-repeat', backgroundPosition: 'top' }}>
        {/* Logo và thông tin thương hiệu */}
        <div className="footer-brand">
          <p className="footer-tagline">
            Lữ hành DPT Travel, thương hiệu lữ hành dẫn đầu xu hướng tại Việt Nam
          </p>
          <p className="footer-subtitle">Thương hiệu quốc gia</p>
          <div className="footer-awards">
            <span>🏆</span>
            <span>⭐</span>
            <span>🏅</span>
          </div>
          <p className="footer-contact">Tổng đài: 1900 XXXX</p>
          <p className="footer-contact">Email: info@dpttravel.net</p>
        </div>

        {/* Dịch vụ */}
        <div className="footer-section">
          <h4 className="footer-title">DỊCH VỤ</h4>
          <ul className="footer-list">
            <li className="footer-item"><a href="/tour-trong-nuoc">Tour trong nước</a></li>
            <li className="footer-item"><a href="/tour-nuoc-ngoai">Tour nước ngoài</a></li>
            <li className="footer-item"><a href="https://www.dichvu.saigontourist.net/" target="_blank" rel="noopener noreferrer">Dịch vụ du lịch</a></li>
            <li className="footer-item"><a href="/trang/dich-vu-ve-may-bay">Vé máy bay</a></li>
            <li className="footer-item"><a href="/trang/dich-vu-thue-xe">Thuê xe</a></li>
            <li className="footer-item"><a href="https://duhoc.saigontourist.net/" target="_blank" rel="noopener noreferrer">Du học DPT Travel</a></li>
            <li className="footer-item"><a href="https://www.tuyendungsaigontourist.vn/" target="_blank" rel="noopener noreferrer">Việc làm ngoài nước</a></li>
          </ul>
        </div>

        {/* Chăm sóc khách hàng */}
        <div className="footer-section">
          <h4 className="footer-title">CHĂM SÓC KHÁCH HÀNG</h4>
          <ul className="footer-list">
            <li className="footer-item"><a href="https://khachhang.saigontourist.net/" target="_blank" rel="noopener noreferrer">Thẻ khách hàng</a></li>
            <li className="footer-item"><a href="https://cskh.appsgt.net/doi-thuong-qua-tang" target="_blank" rel="noopener noreferrer">Đổi điểm Hoa Mai Vàng</a></li>
            <li className="footer-item"><a href="https://saigontourist.net/trang/gioi-thieu-ung-dung-di-dong-saigontourist-travel" target="_blank" rel="noopener noreferrer">Tải App DPT Travel</a></li>
            <li className="footer-item"><a href="/trang/travel-voucher" target="_blank" rel="noopener noreferrer">Travel Voucher</a></li>
            <li className="footer-item"><a href="/trang/bao-hiem-du-lich" target="_blank" rel="noopener noreferrer">Bảo hiểm Du lịch</a></li>
            <li className="footer-item"><a href="/y-kien-khach-hang">Ý kiến khách hàng</a></li>
            <li className="footer-item"><a href="https://cskh.appsgt.net/publish/tourgrouplink/vi-vn" target="_blank" rel="noopener noreferrer">Tra cứu thông tin Đoàn</a></li>
            <li className="footer-item"><a href="https://saigontourist.net/trang/quy-trinh-giai-quyet-khieu-nai" target="_blank" rel="noopener noreferrer">Giải quyết khiếu nại</a></li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div className="footer-section">
          <h4 className="footer-title">LIÊN HỆ</h4>
          <ul className="footer-list">
            <li className="footer-item"><a href="/trang/gioi-thieu-lu-hanh-saigontourist">Giới thiệu</a></li>
            <li className="footer-item"><a href="/lien-he">Liên hệ</a></li>
            <li className="footer-item"><a href="/chi-nhanh">Chi nhánh</a></li>
            <li className="footer-item"><a href="/trang/quy-dinh-bao-ve">Quy định bảo vệ</a></li>
            <li className="footer-item"><a href="/trang/dieu-khoan-chung">Điều khoản chung</a></li>
            <li className="footer-item"><a href="https://saigontourist.net/trang/huong-dan-thanh-toan-tren-website" target="_blank" rel="noopener noreferrer">Hướng dẫn mua tour online</a></li>
            <li className="footer-item"><a href="/trang/quy-dinh-thanh-toan">Quy định thanh toán</a></li>
            <li className="footer-item"><a href="/trang/chinh-sach-giao-nhan">Chính sách giao nhận</a></li>
            <li className="footer-item"><a href="/trang/chinh-sach-huy-phat">Chính sách hủy phạt</a></li>
            <li className="footer-item"><a href="/trang/chinh-sach-bao-mat-va-thu-thap-thong-tin">Chính sách bảo mật</a></li>
            <li className="footer-item"><a href="https://saigontourist.net/trang/chinh-sach-chat-luong" target="_blank" rel="noopener noreferrer">Chính sách chất lượng</a></li>
            <li className="footer-item"><a href="https://www.tuyendungsaigontourist.vn/" target="_blank" rel="noopener noreferrer">Tuyển dụng</a></li>
          </ul>
        </div>
      </div>
      <FooterCard />
    </footer>
  );
};

export default Footer;
