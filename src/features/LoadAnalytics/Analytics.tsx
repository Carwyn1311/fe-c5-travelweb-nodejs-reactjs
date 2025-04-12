import React, { useState, useEffect, useRef } from 'react';
import { message as antdMessage } from 'antd';
import './Analytics.css'; // Import file CSS
import axiosInstance from '../AxiosInterceptor/Content/axiosInterceptor';

interface AnalyticsData {
  totalProcessedResponses: number;
  averageResponseTime: number;
  totalUniqueUsers: number;
}

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const successMessageShownRef = useRef(false);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const response = await axiosInstance.get(`/api/conversations/analytics`);

        // Kiểm tra dữ liệu trả về
        if (!response || !response.data) {
          throw new Error('Không có dữ liệu phân tích');
        }

        // Kiểm tra nếu dữ liệu là hợp lệ
        const analytics: AnalyticsData = response.data;

        // Cập nhật state với dữ liệu phân tích
        setAnalyticsData(analytics);

        if (!successMessageShownRef.current) {
          antdMessage.success('Tải dữ liệu phân tích thành công');
          successMessageShownRef.current = true;
        }
      } catch (error) {
        console.error('Error loading analytics:', error);
        antdMessage.error('Lỗi khi tải dữ liệu: ' + (error as Error).message);
      }
    };

    loadAnalytics();
  }, []);

  return (
    <div className="analytics-container">
      {analyticsData ? (
        <div className="analytics-display">
          <div className="analytics-item">
            <span className="analytics-label">Tổng số câu hỏi đã xử lý:</span>
            <span className="analytics-value">{analyticsData.totalProcessedResponses}</span>
          </div>
          <div className="analytics-item">
            <span className="analytics-label">Thời gian phản hồi trung bình: </span>
            <span className="analytics-value">{analyticsData.averageResponseTime} ms</span>
          </div>
          <div className="analytics-item">
            <span className="analytics-label">Tổng số người dùng duy nhất: </span>
            <span className="analytics-value">{analyticsData.totalUniqueUsers}</span>
          </div>
        </div>
      ) : (
        <div className="loading-message">Đang tải dữ liệu phân tích...</div>
      )}
    </div>
  );
};

export default Analytics;
