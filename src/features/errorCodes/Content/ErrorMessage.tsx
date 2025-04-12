import React, { useState } from 'react';
import '../.css/errorCodes.css'; // Đảm bảo file CSS được tạo để xử lý giao diện

interface ErrorMessageProps {
  message: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <div className="error-message-container">
      <span className="error-icon">⚠️</span>
      <span>{message}</span>
      <button className="error-close-button" onClick={() => setVisible(false)}>×</button> {/* Nút đóng */}
    </div>
  );
};

export default ErrorMessage;
