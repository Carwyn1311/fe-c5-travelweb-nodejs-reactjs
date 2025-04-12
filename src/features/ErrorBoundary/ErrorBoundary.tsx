import React, { Component, ErrorInfo, ReactNode } from 'react';

interface State {
  hasError: boolean;
  error?: Error | null; // Thêm thuộc tính error để lưu lỗi
  errorInfo?: ErrorInfo; // Thêm thuộc tính errorInfo để lưu thông tin chi tiết về lỗi
}

interface ErrorBoundaryProps {
  children: ReactNode; // Khai báo children là ReactNode
}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    // Cập nhật state khi có lỗi xảy ra
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Ghi lại lỗi và thông tin chi tiết về lỗi vào console
    console.error("Error caught by boundary:", error);
    console.error("Error info:", errorInfo);

    // Cập nhật state để lưu lại thông tin lỗi
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f8d7da', borderRadius: '5px' }}>
          <h1>Something went wrong.</h1>
          <p>We encountered an error while processing your request.</p>
          <details style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>
            <summary>Error Details</summary>
            <p><strong>Error Message:</strong> {this.state.error?.message}</p>
            <p><strong>Stack Trace:</strong> {this.state.error?.stack}</p>
            <p><strong>Component Stack:</strong> {this.state.errorInfo?.componentStack}</p>
          </details>
        </div>
      ); // Hiển thị thông báo lỗi và chi tiết lỗi
    }

    return this.props.children; // Render các component con nếu không có lỗi
  }
}

export default ErrorBoundary;
