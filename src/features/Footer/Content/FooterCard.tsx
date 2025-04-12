import React from "react";
import "../css/FooterCard.css"; // Import CSS file

const FooterCard: React.FC = () => {
  return (
    <div className="footer-card">
      {/* Payment Icons */}
      <div className="footer-card-icons">
        <img
          src="/images/thequocte.gif"
          alt="Thẻ Quốc Tế"
          className="footer-card-icon"
          style={{ width: '50%', height: '25%'}}
        />
      </div>

      {/* Footer Information */}
      <div className="footer-card-info">
        <p className="footer-card-text">
          Bản quyền 2006 - 2024 © Công ty TNHH Một Thành Viên Dịch vụ Lữ hành DPT Travel
          <br />
          345 Đỗ Xuân Hợp, Quận 9, TP.HCM.
          <br />
          ĐT: (XX-XX) XX XYX ABC - Fax: (XX-XX) YY XSW DEF.
        </p>
        <p className="footer-card-text">
          Số đăng ký kinh doanh: XXXXXXXXX do Sở kế hoạch và đầu tư TP.HCM
          cấp/thay đổi lần thứ 12, ngày 26/12/2023.
        </p>
        <p className="footer-card-text">
          Người đại diện: Ông Bùi Phi Dương
          <br />
        </p>
      </div>

      {/* Mobile App Download Section */}
      <div className="footer-card-app">
        <p className="footer-card-app-title">Tải app DPT Travel</p>
        <p className="footer-card-app-subtitle">Ứng dụng 5 sao</p>
        <img
          src="/images/app-image.png"
          alt="App Preview"
          className="footer-card-app-image"
        />
        <div className="footer-card-app-buttons">
          <img
            src="/images/logo-chplay.png"
            alt="Google Play"
            className="footer-card-app-button"
            style={{ width: '50px', height: '50px'}}
          />
          <img
            src="/images/App-Store-Logo-2008.png"
            alt="App Store"
            className="footer-card-app-button"
            style={{ width: '50px', height: '50px'}}
          />
        </div>
      </div>

      {/* Contact Section */}
      <div className="footer-card-contact">
        <p className="footer-card-contact-title">Tư vấn & đặt dịch vụ: 1900 XXXX</p>
        <p className="footer-card-contact-info">
          Website DPTTRAVEL.NET đã{" "}
          <span className="footer-card-highlight">được đăng ký</span> với Bộ Công
          Thương
        </p>
        <img
          src="/images/20150827110756-dathongbao.png"
          alt="Bộ Công Thương"
          className="footer-card-contact-badge"
          style={{ width: '200px', height: '80px'}}
        />
        <p className="footer-card-connect-text">Kết nối với Lữ hành DPT Travel</p>
        <div className="footer-card-social-icons">
          <img
            src="/images/social-fa.gif"
            alt="Facebook"
            className="footer-card-social-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default FooterCard;
