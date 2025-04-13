import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  message,
  DatePicker,
  Select,
  Space,
  Input,
  Typography,
  Card,
} from 'antd';
import moment from 'moment-timezone';
import 'moment/locale/en-gb';
import '../css/ListMain.css';
import PaymentDetailService from '../../../service/PaymentDetailService';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Search } = Input;

interface UserInfo {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  username: string;
}

interface PaymentDetail {
  _id: string;
  amount: number;
  payment_date: string;
  status: string;
  invoice_code?: string;
  createdAt?: string;
  payment_method: string;
  user_id: string | UserInfo;
  booking_id: string;
}

const formatDate = (dateString: string) => {
  return moment(dateString).format('DD/MM/YYYY HH:mm:ss');
};

const isDateInRange = (dateString: string, startDate: Date, endDate: Date) => {
  const date = new Date(dateString);
  return date >= startDate && date <= endDate;
};

const PaymentDetailsPage: React.FC = () => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetail[]>([]);
  const [filteredPaymentDetails, setFilteredPaymentDetails] = useState<PaymentDetail[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    fetchPaymentDetails();
  }, []);

  const fetchPaymentDetails = async () => {
    try {
      const response = await PaymentDetailService.getPaymentDetails();
      if (response.success) {
        setPaymentDetails(response.data);
        setFilteredPaymentDetails(response.data);
      } else {
        message.error('Không thể tải danh sách thanh toán');
      }
    } catch (error) {
      message.error('Lỗi kết nối khi tải chi tiết thanh toán');
    }
  };

  const updatePaymentStatus = async (_id: string, status: string) => {
    try {
      await PaymentDetailService.updatePaymentDetail(_id, { status });
      message.success('Cập nhật trạng thái thành công');
      fetchPaymentDetails();
    } catch (error) {
      message.error('Lỗi khi cập nhật trạng thái thanh toán');
    }
  };

  const handleDateRangeChange = (dates: [Date, Date] | null, dateStrings: [string, string]) => {
    setDateRange(dates);
    applyFilters(dates, statusFilter, searchText);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    applyFilters(dateRange, value, searchText);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    applyFilters(dateRange, statusFilter, value);
  };

  const applyFilters = (dateRange: [Date, Date] | null, statusFilter: string | undefined, searchText: string) => {
    let filteredData = paymentDetails;

    if (dateRange) {
      filteredData = filteredData.filter(payment =>
        isDateInRange(payment.payment_date, dateRange[0], dateRange[1])
      );
    }

    if (statusFilter) {
      filteredData = filteredData.filter(payment =>
        payment.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (searchText) {
      filteredData = filteredData.filter(payment =>
        payment.invoice_code?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredPaymentDetails(filteredData);
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      align: 'center' as const,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Họ tên',
      key: 'fullname',
      dataIndex: 'user_id',
      align: 'center' as const,
      render: (user: UserInfo | string) =>
        typeof user === 'object' ? user.fullname : '—',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'user_id',
      align: 'center' as const,
      render: (user: UserInfo | string) =>
        typeof user === 'object' ? user.email : '—',
    },
    {
      title: 'Số điện thoại',
      key: 'phone',
      dataIndex: 'user_id',
      align: 'center' as const,
      render: (user: UserInfo | string) =>
        typeof user === 'object' ? user.phone : '—',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center' as const,
      render: (amount: number) => amount.toLocaleString('vi-VN') + ' đ',
    },
    {
      title: 'Payment Date',
      dataIndex: 'payment_date',
      key: 'payment_date',
      align: 'center' as const,
      render: (text: string) => formatDate(text),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as const,
      render: (status: string) => {
        const color =
          status === 'completed'
            ? 'green'
            : status === 'pending'
            ? 'orange'
            : 'red';
        return <span style={{ color, fontWeight: 500, textTransform: 'uppercase' }}>{status}</span>;
      },
    },
    {
      title: 'Invoice Code',
      dataIndex: 'invoice_code',
      key: 'invoice_code',
      align: 'center' as const,
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center' as const,
      render: (_: any, record: PaymentDetail) => (
        <Space>
          {record.status.toLowerCase() === 'pending' && (
            <>
              <Button
                type="primary"
                onClick={() => updatePaymentStatus(record._id, 'completed')}
                style={{ borderRadius: 8, fontWeight: 500 }}
              >
                Confirm
              </Button>
              <Button
                danger
                onClick={() => updatePaymentStatus(record._id, 'cancelled')}
                style={{ borderRadius: 8, fontWeight: 500 }}
              >
                Cancel
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="mainlist-container">
      <div className="mainlist-header">
        <Typography.Title level={3} className="mainlist-title">
          Payment Details
        </Typography.Title>
      </div>

      <Card style={{ marginBottom: 16, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <Space style={{ flexWrap: 'wrap' }}>
          <RangePicker
            onChange={(dates, dateStrings) =>
              handleDateRangeChange(
                dates ? [new Date(dateStrings[0]), new Date(dateStrings[1])] : null,
                dateStrings
              )
            }
          />
          <Select
            placeholder="Select status"
            onChange={handleStatusChange}
            allowClear
            style={{ width: 180 }}
          >
            <Option value="pending">PENDING</Option>
            <Option value="completed">COMPLETED</Option>
            <Option value="cancelled">CANCELLED</Option>
          </Select>
          <Search
            placeholder="Search by Invoice Code"
            onSearch={handleSearch}
            allowClear
            style={{ width: 300 }}
          />
        </Space>
      </Card>

      <Table
        dataSource={filteredPaymentDetails}
        columns={columns}
        rowKey="_id"
        className="mainlist-table"
        pagination={{
          className: 'mainlist-pagination',
          pageSize: 7,
          showSizeChanger: false,
        }}
      />
    </div>
  );
};

export default PaymentDetailsPage;
