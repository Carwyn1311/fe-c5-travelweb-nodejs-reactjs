import React from 'react';
import './Info.css';  // Import file CSS đã tạo

const Info: React.FC = () => {
  return (
    <div className="info-container">
      <h1 className="info-title">Thông tin về hệ thống</h1>
      <ul className="info-list">
        <li><strong>Version:</strong> 1.0.0</li>
        <li><strong>Người tạo:</strong> Lê Trọng Phúc</li>
        <li><strong>Nhóm phát triển:</strong> Nhóm 05</li>
        <li><strong>Liên hệ kỹ thuật:</strong></li>
        <ul className="info-sublist">
          <li>Hotline: 0904752033 </li>
          <li>Email: phucle11132003@gmail.com</li>
        </ul>
      </ul>
    </div>
  );
};

export default Info;
