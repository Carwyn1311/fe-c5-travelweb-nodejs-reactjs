import React, { useEffect, useState } from 'react';
import { Table, Button, message, DatePicker, Select, Card, Space, Input } from 'antd';
import axiosInstanceToken from '../../AxiosInterceptor/Content/axioslnterceptorToken';
import 'moment/locale/en-gb';
import moment, { Moment } from 'moment-timezone';
import '../css/ListMain.css'; // Import CSS chung

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Search } = Input;

interface PaymentDetail {
  id: number;
  amount: number;
  payment_date: string;
  status: string;
  invoiceCode: string;
  created_at: string;
  payment_method_id: number;
  user_id: number;
  booking_id: number;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  return new Date(dateString).toLocaleDateString('en-GB', options).replace(',', '');
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
      const response = await axiosInstanceToken.get('/api/payments/list');
      setPaymentDetails(response.data);
      setFilteredPaymentDetails(response.data); // Set initial filtered data
    } catch (error) {
      message.error('Failed to fetch payment details');
    }
  };

  const updatePaymentStatus = async (id: number, status: string) => {
    try {
      await axiosInstanceToken.put(`/api/payments/${id}/status`, { status });
      message.success('Payment status updated successfully');
      fetchPaymentDetails(); // Refresh the list
    } catch (error) {
      message.error('Failed to update payment status');
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
      filteredData = filteredData.filter(payment => payment.status === statusFilter);
    }

    if (searchText) {
      filteredData = filteredData.filter(payment => payment.invoiceCode.toLowerCase().includes(searchText.toLowerCase()));
    }

    setFilteredPaymentDetails(filteredData);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Payment Date',
      dataIndex: 'payment_date',
      key: 'payment_date',
      render: (text: string) => formatDate(text),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Invoice Code',
      dataIndex: 'invoiceCode',
      key: 'invoiceCode',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: PaymentDetail) => (
        <Space>
          {record.status === 'PENDING' && (
            <>
              <Button type="primary" onClick={() => updatePaymentStatus(record.id, 'COMPLETED')} className="mainlist-confirm-btn">Confirm</Button>
              <Button type="default" danger onClick={() => updatePaymentStatus(record.id, 'CANCELLED')} className="mainlist-cancel-btn">Cancel</Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className='mainlist-container'>
      <div className='mainlist-header'>
        <h2 className='mainlist-title'>Payment Details</h2>
      </div>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Space style={{ marginBottom: 16 }} wrap>
          <RangePicker
            onChange={(dates, dateStrings) =>
              handleDateRangeChange(dates ? [new Date(dateStrings[0]), new Date(dateStrings[1])] : null, dateStrings)
            }
          />
          <Select
            placeholder="Select status"
            onChange={handleStatusChange}
            style={{ width: 200 }}
          >
            <Option value="PENDING">PENDING</Option>
            <Option value="COMPLETED">COMPLETED</Option>
            <Option value="CANCELLED">CANCELLED</Option>
          </Select>
          <Search
            placeholder="Search by Invoice Code"
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
        </Space>
        <Table
          dataSource={filteredPaymentDetails}
          columns={columns}
          rowKey="id"
          className="mainlist-table"
          pagination={{
            className: 'mainlist-pagination'
          }}
        />
      </Space>
    </div>
  );
};

export default PaymentDetailsPage;
